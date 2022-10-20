import React, {
  ReactElement, useMemo, useState,
} from 'react';
import {
  Box, LinearProgress, Paper,
} from '@mui/material';
import { formatCurrency, formatTime } from '../../Shared/Utils/Helpers';
import { AssetsItemInterface } from '../../Api/AssetsInterfaces';
import { USD_CURRENCY_TICKER } from '../../Shared/Config';
import { useStylesInfoBox } from './Styles/InfoBoxStyles';
import { InfoBoxHeader } from './Components/InfoBoxHeader';
import { InfoLabelRow } from '../InfoLabelRow/InfoLabelRow';

interface InfoBoxInterface {
    cryptoItem: AssetsItemInterface | undefined;
    timestamp: number | undefined;
    updateAsset(): void;

}

export function InfoBox({ cryptoItem, timestamp, updateAsset }: InfoBoxInterface): ReactElement {
  const [delay, setDelay] = useState<boolean>(false);

  const makeExplorerLink = useMemo((): string | undefined => {
    if (cryptoItem?.symbol === 'BTC') {
      const symbol = cryptoItem?.symbol.toLocaleLowerCase();
      return `https://www.blockchain.com/explorer?view=${symbol}`;
    } if (cryptoItem?.symbol === 'ETH') {
      return cryptoItem?.explorer;
    }
    const symbol = cryptoItem?.name.toLocaleLowerCase();
    return `https://blockchair.com/${symbol}`;
  }, [cryptoItem]);

  return (
    <Paper sx={useStylesInfoBox().paper} elevation={3}>
      <InfoBoxHeader
        delay={delay}
        setDelay={setDelay}
        timestamp={formatTime(timestamp)}
        updateAsset={updateAsset}
        rank={cryptoItem?.rank}
      />
      <Box mb={1} />
      {delay ? (
        <>
          <Box mt={1} />
          <LinearProgress />
        </>
      ) : (
        <>
          <InfoLabelRow
            labelName="Crypto"
            value={`${cryptoItem?.name}[${cryptoItem?.symbol}]`}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName="Supply"
            value={Number(cryptoItem?.supply).toFixed(0)}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName="Max Supply"
            value={Number(cryptoItem?.maxSupply).toFixed(0)}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName={`Market Cap, ${USD_CURRENCY_TICKER}`}
            value={formatCurrency.format(Number(cryptoItem?.marketCapUsd))}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName={`Volume 24h, ${USD_CURRENCY_TICKER}`}
            value={formatCurrency.format(Number(cryptoItem?.volumeUsd24Hr))}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName={`Price, ${USD_CURRENCY_TICKER}`}
            value={formatCurrency.format(Number(cryptoItem?.priceUsd))}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName="Change (%), 24h"
            value={Number(cryptoItem?.changePercent24Hr).toFixed(2)}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            labelName={`Volume-Weighted Average Price (VWAP), ${USD_CURRENCY_TICKER}`}
            value={formatCurrency.format(Number(cryptoItem?.vwap24Hr))}
            labelSx={useStylesInfoBox().label}
          />
          <InfoLabelRow
            withLink
            link={makeExplorerLink}
            labelName="Explore"
            value={cryptoItem?.explorer}
            labelSx={useStylesInfoBox().label}
          />
        </>
      )}
    </Paper>
  );
}
