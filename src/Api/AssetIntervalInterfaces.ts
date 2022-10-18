export interface AssetItemIntervalInterface {
    priceUsd: string;
    time: number;
    date: string;
}

export interface AssetIntervalInterface {
    data: AssetItemIntervalInterface[];
    timestamp: number;
}
