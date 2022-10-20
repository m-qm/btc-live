import React, {
  ReactElement, useCallback, useEffect, useMemo, useState,
} from 'react';
import { Dashboard } from './Dashboard';
import CoincapService from '../../Services/Coincap-Service';
import { AssetsInterface } from '../../Api/AssetsInterfaces';
import { RatesInterface } from '../../Api/RatesInterfaces';
import { AssetIntervalInterface, AssetItemIntervalInterface } from '../../Api/AssetIntervalInterfaces';
import { formatDate } from '../../Shared/Utils/Helpers';
import { ChartDataInterface } from '../../Components/PriceChart/Utils/PriceChartInterfaces';
import { LayoutPage } from '../../Shared/Layout/LayoutPage';
import { TokenInterface } from '../../Shared/System/SystemTypes';

export function DashboardPage(): ReactElement {
  const [ratesData, setRatesData] = useState<RatesInterface | undefined>();
  const [tokensData, setTokensData] = useState<TokenInterface>();
  const [assetData, setAssetData] = useState<AssetsInterface | undefined>();
  const [chartData, setChartData] = useState<ChartDataInterface>();
  const [chartTimestampData, setChartTimestampData] = useState<number>();

  const handleTokens = useCallback((): void => {
    CoincapService
      .getTokens()
      .then((data: TokenInterface) => {
        setTokensData(data);
      });
  }, []);

  const findBitcoin = useMemo((): string => {
    let bitcoin: string = '';
    if (tokensData !== undefined) {
      Object.entries(tokensData as {}).find(([key, value]) => {
        if (value === 'bitcoin') {
          bitcoin = value;
          return key;
        }
        return false;
      });
    }
    return bitcoin;
  }, [tokensData]);

  const handleGetRates = useCallback((crypto: string): void => {
    if (findBitcoin) {
      CoincapService
        .getRates(crypto)
        .then((data: RatesInterface) => {
          setRatesData(data);
        });
    }
  }, [findBitcoin]);

  const handleGetAssetDetails = useCallback((crypto: string): void => {
    CoincapService
      .getAssetDetails(crypto)
      .then((data: AssetsInterface) => {
        setAssetData(data);
      });
  }, []);

  const handleGetAssetInterval = useCallback((crypto: string): void => {
    CoincapService
      .getAssetInterval(crypto)
      .then((data: AssetIntervalInterface) => {
        setChartTimestampData(data.timestamp);
        setChartData({
          labels: data.data.map((assetItem: AssetItemIntervalInterface) => formatDate(assetItem.time)),
          datasets: [
            {
              label: 'Price in USD',
              data: data.data.map((assetItem: AssetItemIntervalInterface) => assetItem.priceUsd),
              backgroundColor: [
                '#ffbb11',
              ],
            },
          ],
        });
      });
  }, []);

  useEffect(() => {
    handleTokens();
    if (findBitcoin) {
      handleGetRates(findBitcoin);
      handleGetAssetDetails(findBitcoin);
      handleGetAssetInterval(findBitcoin);
    }
  }, [findBitcoin, handleGetAssetDetails, handleGetAssetInterval, handleGetRates, handleTokens]);

  return (
    <LayoutPage centered>
      <Dashboard
        chartTimestamp={chartTimestampData}
        chartData={chartData}
        assetData={assetData}
        ratesData={ratesData}
        refreshRates={() => handleGetRates(findBitcoin)}
        refreshAsset={() => handleGetAssetDetails(findBitcoin)}
        refreshChart={() => handleGetAssetInterval((findBitcoin))}
      />
    </LayoutPage>
  );
}
