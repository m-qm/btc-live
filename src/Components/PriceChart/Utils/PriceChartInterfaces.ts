export interface ChartDatasetInterface {
    label: string;
    data: string[];
    backgroundColor: string[];
}

export interface ChartDataInterface {
    labels: string[];
    datasets: ChartDatasetInterface[];
}
