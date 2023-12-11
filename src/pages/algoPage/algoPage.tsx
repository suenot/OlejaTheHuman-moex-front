import React, {useEffect, useState} from "react";
import styles from './algo-page.module.css';
import {Header} from "../../components";
import {useLoaderData} from "react-router";
import {AlgoRequestI} from "../../types /types";
import {SelectDesktop} from "@alfalab/core-components/select/Component.desktop";
import {ButtonDesktop} from "@alfalab/core-components/button/Component.desktop";
import {executeAlgo} from "../../api/api";
import {useLocation} from "react-router-dom";
import {VictoryChart, VictoryScatter} from "victory";

export default function AlgoPage() {
    const algo = useLoaderData() as AlgoRequestI | undefined;
    const location = useLocation();
    const { hash, pathname, search } = location;
    const [dots, setDots] = useState<number[]>([])

    const [selectedParams, setSelectedParams] = useState<{
        trade_strategy: undefined | string;
        interval: undefined | string;
        pred_shift: undefined | string;
        features_dict_size: undefined | string;
        models_size: undefined | string;
    }>({
        trade_strategy: undefined,
        interval: undefined,
        pred_shift: undefined,
        features_dict_size: undefined,
        models_size: undefined,
    })

    useEffect(() => {
        console.log(pathname.split('/')[2].replace('%20', ' '))
    }, []);

    function isButtonDisabled(): boolean {
        for (let key in selectedParams) {
            //@ts-ignore
            if (!selectedParams[key]) return true
        }
        return false;
    }

    function execute(){
        executeAlgo(pathname.split('/')[2].replace('%20', ' '), selectedParams)
            .then(res => setDots(res));
    }

    return (
        <>
            <Header/>
            <div className={styles.wrapper}>
                <div className={styles.params}>
                    <SelectDesktop
                        size='m'
                        options={algo?.trade_strategy.map(val => ({
                            key: val, content: val,
                        })) ?? []
                        }
                        placeholder='Выберите элемент'
                        label='Стратегия'
                        block={true}
                        onChange={option => {
                            setSelectedParams(prev => ({
                                ...prev,
                                trade_strategy: option.selected?.key,
                            }))
                        }}
                    />
                    <SelectDesktop
                        allowUnselect={true}
                        size='m'
                        options={algo?.interval.map(val => ({
                            key: val, content: val,
                        })) ?? []
                        }
                        placeholder='Выберите элемент'
                        label='Интервал'
                        block={true}
                        onChange={option => {
                            setSelectedParams(prev => ({
                                ...prev,
                                interval: option.selected?.key,
                            }))
                        }}
                    />
                    <SelectDesktop
                        allowUnselect={true}
                        size='m'
                        options={algo?.pred_shift.map(val => ({
                            key: val, content: val,
                        })) ?? []
                        }
                        placeholder='Выберите элемент'
                        label='Pred shift'
                        block={true}
                        onChange={option => {
                            setSelectedParams(prev => ({
                                ...prev,
                                pred_shift: option.selected?.key,
                            }))
                        }}
                    />
                    <SelectDesktop
                        allowUnselect={true}
                        size='m'
                        options={algo?.features_dict_size.map(val => ({
                            key: val, content: val,
                        })) ?? []
                        }
                        placeholder='Выберите элемент'
                        label='Dict size'
                        block={true}
                        onChange={option => {
                            setSelectedParams(prev => ({
                                ...prev,
                                features_dict_size: option.selected?.key,
                            }))
                        }}
                    />
                    <SelectDesktop
                        allowUnselect={true}
                        size='m'
                        options={algo?.models_size.map(val => ({
                            key: val, content: val,
                        })) ?? []
                        }
                        placeholder='Выберите элемент'
                        label='Models size'
                        block={true}
                        onChange={option => {
                            setSelectedParams(prev => ({
                                ...prev,
                                models_size: option.selected?.key,
                            }))
                        }}
                    />
                </div>
                <ButtonDesktop
                    disabled={isButtonDisabled()}
                    view='primary'
                    onClick={execute}
                >
                    Далее 👇
                </ButtonDesktop>
            </div>
            <div className={styles.chart}>
                <VictoryChart
                    domainPadding={20}
                >
                    <VictoryScatter
                        style={{
                            parent: {border: "1px solid #ccc"}
                        }}
                        data={dots.map((y, x) => ({x, y}))}
                    />
                </VictoryChart>
            </div>
        </>
    );
}
