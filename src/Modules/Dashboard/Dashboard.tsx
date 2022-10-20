import React, { ReactElement, useMemo } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import { InfoCard } from '../../Components/InfoCard/InfoCard';
import { InfoBox } from '../../Components/InfoBox/InfoBox';
import { AssetsInterface } from '../../Api/AssetsInterfaces';
import { RatesInterface } from '../../Api/RatesInterfaces';
import { ChartDataInterface } from '../../Components/PriceChart/Utils/PriceChartInterfaces';
import { PriceChart } from '../../Components/PriceChart/PriceChart';

interface DashboardInterface {
  ratesData: RatesInterface | undefined;
  assetData: AssetsInterface | undefined;
  chartTimestamp: number | undefined;
  chartData: ChartDataInterface | undefined;
  refreshRates(): void;
  refreshAsset(): void;
  refreshChart(): void;
}

export function Dashboard({
  chartData, ratesData, refreshRates, assetData, refreshAsset, chartTimestamp, refreshChart,
}: DashboardInterface): ReactElement {
  const isLoading = useMemo(
    (): boolean => (ratesData === undefined) || (assetData === undefined || chartData === undefined),
    [ratesData, assetData, chartData],
  );

  return useMemo(() => {
    if (isLoading) return <LinearProgress />;
    return (
      <>
        <Box my={2}>
          <Typography variant="h4" component="h4">Dashboard</Typography>
        </Box>

        <InfoCard updateRates={refreshRates} cryptoItem={ratesData?.data} timestamp={ratesData?.timestamp} />
        <Box my={2} />

        <PriceChart updateChart={refreshChart} chartData={chartData} timestamp={chartTimestamp || 0} />
        <Box my={2} />
        <InfoBox cryptoItem={assetData?.data} timestamp={assetData?.timestamp} updateAsset={refreshAsset} />

      </>
    );
  }, [
    isLoading, refreshRates, ratesData?.data,
    ratesData?.timestamp, assetData?.data,
    assetData?.timestamp, refreshAsset,
    refreshChart, chartData, chartTimestamp]);
}
