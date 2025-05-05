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
  Legend,
  ChartData,
} from 'chart.js';
import {
  Box,
  LinearProgress,
  Button,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatTime } from '../../Shared/Utils/Helpers';
import { InfoLabel } from '../InfoLabel/InfoLabel';
import { ChartDataInterface } from './Utils/PriceChartInterfaces';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartInterface {
  chartData: ChartDataInterface | undefined;
  updateChart(): void;
  timestamp: number;
  title: string;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function PriceChart({
  chartData,
  timestamp,
  updateChart,
  title,
}: ChartInterface): ReactElement {
  const [delay, setDelay] = useState<boolean>(false);

  const handleUpdateChart = useCallback((): void => {
    updateChart();
    setDelay(true);
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, [updateChart]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
        color: '#ffffff',
        font: {
          size: 18,
          weight: 'bold',
          family: 'Roboto, sans-serif',
        },
      },
      legend: {
        display: true,
        labels: {
          color: '#cccccc',
          font: {
            family: 'Roboto, sans-serif',
          },
        },
      },
      tooltip: {
        backgroundColor: '#333333',
        titleColor: '#ffffff',
        bodyColor: '#dddddd',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#bbbbbb',
        },
        grid: {
          color: '#444444',
        },
      },
      y: {
        ticks: {
          color: '#bbbbbb',
        },
        grid: {
          color: '#444444',
        },
      },
    },
  };

  const chartContainerStyle = {
    backgroundColor: '#1e1e1e',
    padding: '16px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    color: '#ffffff',
    minHeight: '300px',
  };

  return (
      <Box sx={chartContainerStyle}>
        <Box mx={2} />
        {delay ? (
          <Box height="200px">
            <LinearProgress />
          </Box>
        ) : (
          <Box height="300px">
            <Line
              data={chartData || ([] as unknown as ChartData<'line', string[], string>)}
              options={options}
            />
          </Box>
        )}
        <Box mt={2} />
        <Button
          disabled={delay}
          endIcon={<RefreshIcon />}
          variant="contained"
          type="button"
          size="small"
          onClick={handleUpdateChart}
          sx={{
            backgroundColor: '#2e2e2e',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#444444',
            },
          }}
        >
          Update information
        </Button>
        <Box mb={1} />
        <InfoLabel value={formatTime(timestamp)} labelName="Last updated" />
      </Box>
  );
}
