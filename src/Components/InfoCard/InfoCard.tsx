import React, {
  ReactElement, useCallback, useState,
} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, LinearProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { formatCurrency, formatTime } from '../../Shared/Utils/Helpers';
import { RatesItemInterface } from '../../Api/RatesInterfaces';
import { USD_CURRENCY_TICKER } from '../../Shared/Config';
import { useStylesInfoCard } from './Styles/InfoCardStyles';
import { InfoLabel } from '../InfoLabel/InfoLabel';
import { InfoLabelRow } from '../InfoLabelRow/InfoLabelRow';

interface InfoCardInterface{
  cryptoItem: RatesItemInterface | undefined;
  timestamp: number | undefined;
  updateRates(): void;
}

export function InfoCard({ cryptoItem, timestamp, updateRates }: InfoCardInterface): ReactElement {
  const [delay, setDelay] = useState<boolean>(false);

  const handleUpdateRates = useCallback((): void => {
    updateRates();
    setDelay(true);
    setTimeout(() => {
      setDelay(false);
    }, 1000);
  }, [updateRates]);

  console.log('InfoCard', cryptoItem);

  return (
    <Card sx={useStylesInfoCard().card}>
      <CardContent sx={useStylesInfoCard().cardContent}>
        {delay ? (
          <>
            <Box mt={1} />
            <LinearProgress />
          </>
        ) : (
          <>
            <InfoLabelRow
              labelName="Currency"
              value={`${cryptoItem?.currencySymbol ?? ''}[${cryptoItem?.symbol}]`}
              labelSx={useStylesInfoCard().label}
            />
            <InfoLabelRow
              labelName={`Price, ${USD_CURRENCY_TICKER}`}
              value={formatCurrency.format(Number(cryptoItem?.rateUsd))}
              labelSx={useStylesInfoCard().label}
            />
          </>
        )}
      </CardContent>
      <Box />
      <CardActions>
        <Box mx={2}>
          <Button
            disabled={delay}
            endIcon={<RefreshIcon />}
            variant="contained"
            type="button"
            size="small"
            onClick={handleUpdateRates}
          >
            Update information
          </Button>
          <Box mb={1} />
          <InfoLabel labelName="Last updated" value={formatTime(timestamp)} />
        </Box>
      </CardActions>
    </Card>
  );
}
