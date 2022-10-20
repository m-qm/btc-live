import { AxiosResponse } from 'axios';
import { httpGet, localGet } from './HTTP-Service';
import {
  API_ASSET_DETAILS, API_ASSET_INTERVAL, API_RATES, API_TOKENS,
} from '../Api/Api';
import { AssetIntervalInterface } from '../Api/AssetIntervalInterfaces';
import { AssetsInterface } from '../Api/AssetsInterfaces';
import { RatesInterface } from '../Api/RatesInterfaces';
import { TokenInterface } from '../Shared/System/SystemTypes';

const getRates = (crypto: string): Promise<RatesInterface> => httpGet(API_RATES(crypto))
  .then((data: AxiosResponse) => data.data);

const getAssetDetails = (crypto: string): Promise<AssetsInterface> => httpGet(API_ASSET_DETAILS(crypto))
  .then((data: AxiosResponse) => data.data);

const getAssetInterval = (crypto: string): Promise<AssetIntervalInterface> => httpGet(API_ASSET_INTERVAL(crypto))
  .then((data: AxiosResponse) => data.data);

const getTokens = (): Promise<TokenInterface> => localGet(API_TOKENS)
  .then((data: AxiosResponse) => data.data);

const CoincapService = {
  getRates,
  getAssetDetails,
  getAssetInterval,
  getTokens,
};

export default CoincapService;
