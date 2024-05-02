import React, { ReactElement, useCallback, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, ChartData,
} from 'chart.js';
import { Box, LinearProgress } from '@mui/material';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatTime } from '../../Shared/Utils/Helpers';
import { useStylesPriceChart } from './Styles/PriceChartStyles';
import { InfoLabel } from '../InfoLabel/InfoLabel';
import { ChartDataInterface } from './Utils/PriceChartInterfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartInterface {
  chartData: ChartDataInterface | undefined;
  updateChart(): void;
  timestamp: number;
  title: string;
}

export function PriceChart({
  chartData, timestamp, updateChart, title,
} : ChartInterface): ReactElement {
  const [delay, setDelay] = useState<boolean>(false);

  const handleUpdateChart = useCallback((): void => {
    updateChart();
    setDelay(true);
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, [updateChart]);

  const options = {
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
      },
    },
  };

  return (
    <Box sx={useStylesPriceChart().chart}>
      <Box mx={2} />
      {delay ? (
        <Box height="200px">
          <LinearProgress />
        </Box>
      ) : (
        <Line
          data={chartData || [] as unknown as ChartData<'line', string[], string>}
          options={options}
        />
      )}
      <Box mt={2} />
      <Button
        disabled={delay}
        endIcon={<RefreshIcon />}
        variant="contained"
        type="button"
        size="small"
        onClick={handleUpdateChart}
      >
        Update information
      </Button>
      <Box mb={1} />
      <InfoLabel value={formatTime(timestamp)} labelName="Last updated" />
    </Box>
  );
}
