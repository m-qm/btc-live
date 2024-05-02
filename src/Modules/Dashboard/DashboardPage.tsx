import {
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Dashboard } from './Dashboard';
import { Select } from '../../Components/Select/Select';
import CoincapService from '../../Services/Coincap-Service';
import { AssetsInterface } from '../../Api/AssetsInterfaces';
import { RatesInterface } from '../../Api/RatesInterfaces';
import {
  AssetIntervalInterface,
  AssetItemIntervalInterface,
} from '../../Api/AssetIntervalInterfaces';
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

  const [selectedCrypto, setSelectedCrypto] = useState<string>('bitcoin');

  const handleTokens = useCallback((): void => {
    CoincapService.getTokens().then((data: TokenInterface) => {
      setTokensData(data);
    });
  }, []);

  const handleGetRates = useCallback(
    (crypto: string): void => {
      CoincapService.getRates(crypto).then((data: RatesInterface) => {
        setRatesData(data);
      });
    },
    [],
  );

  const handleGetAssetDetails = useCallback((crypto: string): void => {
    CoincapService.getAssetDetails(crypto).then((data: AssetsInterface) => {
      setAssetData(data);
    });
  }, []);

  const handleGetAssetInterval = useCallback((crypto: string): void => {
    CoincapService.getAssetInterval(
      crypto,
    ).then((data: AssetIntervalInterface) => {
      setChartTimestampData(data.timestamp);
      setChartData({
        labels: data.data.map((assetItem: AssetItemIntervalInterface) => formatDate(assetItem.time)),
        datasets: [
          {
            label: 'Price in USD',
            data: data.data.map(
              (assetItem: AssetItemIntervalInterface) => assetItem.priceUsd,
            ),
            backgroundColor: ['#ffbb11'],
          },
        ],
      });
    });
  }, []);

  useEffect(() => {
    handleTokens();
  }, [handleTokens]);

  useEffect(() => {
    if (selectedCrypto) {
      handleGetRates(selectedCrypto);
      handleGetAssetDetails(selectedCrypto);
      handleGetAssetInterval(selectedCrypto);
    }
  }, [
    selectedCrypto,
    handleGetRates,
    handleGetAssetDetails,
    handleGetAssetInterval,
  ]);

  return (
    <LayoutPage centered>
      {tokensData && (
        <Select
          selectedCrypto={selectedCrypto}
          setSelectedCrypto={setSelectedCrypto}
          isLoading={!ratesData || !tokensData || !assetData || !chartData || !chartTimestampData}
          options={tokensData || {}}
        />
      )}
      <Dashboard
        chartTimestamp={chartTimestampData}
        chartData={chartData}
        assetData={assetData}
        ratesData={ratesData}
        refreshRates={() => handleGetRates(selectedCrypto)}
        refreshAsset={() => handleGetAssetDetails(selectedCrypto)}
        refreshChart={() => handleGetAssetInterval(selectedCrypto)}
      />
    </LayoutPage>
  );
}
