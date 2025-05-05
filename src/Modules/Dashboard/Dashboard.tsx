import React, { type ReactElement, useMemo, useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Divider, TextField, Button } from '@mui/material';
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

  // State for BTC Converter
  const [btcAmount, setBtcAmount] = useState<number>(0);
  const [convertedValue, setConvertedValue] = useState<number | null>(null);
  const [savedBtc, setSavedBtc] = useState<number | null>(null);

  // Load saved BTC from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedBtc');
    if (saved) {
      setSavedBtc(Number.parseFloat(saved));
    }
  }, []);

  // Handle BTC conversion
  const handleConvert = () => {
    if (ratesData?.data?.BTC) {
      const rate = ratesData.data.BTC; // Assuming ratesData contains BTC rate in USD
      setConvertedValue(btcAmount * rate);
    }
  };

  // Handle saving BTC to localStorage
  const handleSave = () => {
    localStorage.setItem('savedBtc', btcAmount.toString());
    setSavedBtc(btcAmount);
  };

  return useMemo(() => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }

    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
        padding={4}
        marginTop={2}
        bgcolor="#1f1f1f"
        color="black"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h3" fontWeight="bold" color="white">
          Dashboard
        </Typography>

        <Divider sx={{ width: '100%', maxWidth: '800px', borderColor: '#ddd' }} />

        {/* BTC Converter */}
        {/* <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          width="100%"
          maxWidth="400px"
          padding={2}
          borderRadius="8px"
          boxShadow="0 2px 8px rgba(0, 0, 0, 0.1)"
        >
          <Typography variant="h5" fontWeight="bold" color="#333">
            BTC Converter
          </Typography>
          <TextField
            label="BTC Amount"
            type="number"
            color="info"
            variant="outlined"
            value={btcAmount === 0 ? '' : btcAmount}
            onChange={(e) => {
              const value = e.target.value;
              setBtcAmount(value === '' ? 0 : Number.parseFloat(value));
            }}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleConvert}>
            Convert to USD
          </Button>
          {convertedValue !== null && (
            <Typography variant="body1" color="green">
              Value: ${convertedValue.toFixed(2)}
            </Typography>
          )}
          <Button variant="outlined" color="secondary" onClick={handleSave}>
            Save BTC Amount
          </Button>
          {savedBtc !== null && (
            <Typography variant="body2" color="gray">
              Saved BTC: {savedBtc}
            </Typography>
          )}
        </Box> */}

        <Box display="flex" flexDirection="column" gap={4} width="100%" maxWidth="800px">
          <InfoCard
            updateRates={refreshRates}
            cryptoItem={ratesData?.data}
            timestamp={ratesData?.timestamp}
          />

          <PriceChart
            updateChart={refreshChart}
            chartData={chartData}
            timestamp={chartTimestamp || 0}
            title="Price Chart"
          />

          <InfoBox
            cryptoItem={assetData?.data}
            timestamp={assetData?.timestamp}
            updateAsset={refreshAsset}
          />
        </Box>
      </Box>
    );
  }, [
    isLoading,
    refreshRates,
    ratesData?.data,
    ratesData?.timestamp,
    assetData?.data,
    assetData?.timestamp,
    refreshAsset,
    refreshChart,
    chartData,
    chartTimestamp,
    btcAmount,
    convertedValue,
    savedBtc,
  ]);
}