import axios, { AxiosResponse } from 'axios';
import { API_BASE } from '../Shared/Config';

export async function localGet(url: string): Promise<AxiosResponse<unknown>> {
  const request = axios.create({
    headers: {
      'Content-type': 'application/json',
    },
  }).get(url);

  request.catch((error) => {
    let errorMessage = '[HTTP-Service LOCAL-GET Internal Error]';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
  });

  return request;
}

export async function httpGet(url: string): Promise<AxiosResponse<unknown>> {
  const request = axios.create({
    baseURL: API_BASE,
    headers: {
      'Content-type': 'application/json',
      // fix Property 'env' does not exist on type 'ImportMeta'.ts(2339)
      // @ts-ignore
      Authorization: `Bearer ${import.meta.env.VITE_COINCAP_API_KEY}`,
    },
  }).get(url);

  request.catch((error) => {
    let errorMessage = '[HTTP-Service GET Internal Error]';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(errorMessage);
  });

  return request;
}
