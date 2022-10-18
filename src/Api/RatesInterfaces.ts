export interface RatesItemInterface{
    currencySymbol: string;
    id: string;
    rateUsd: string;
    symbol: string;
    type: string;
}

export interface RatesInterface {
    data: RatesItemInterface;
    timestamp: number;
}
