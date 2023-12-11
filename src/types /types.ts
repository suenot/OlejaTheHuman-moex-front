// NEW

export type AllAlgosRequestT = string[];

export interface AlgoRequestI {
    trade_strategy: string[];
    interval: string[];
    pred_shift: string[];
    tickers: string;
    features_dict_size: string[];
    models_size: string[];
}

