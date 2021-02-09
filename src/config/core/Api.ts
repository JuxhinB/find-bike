import axios, { AxiosRequestConfig } from "axios";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_dev_base_url
    : process.env.REACT_APP_prod_base_url;

export interface FetchApiProps extends AxiosRequestConfig {
  withBearer?: boolean;
  customHeaders?: object;
  fullUrl?: boolean;
}

export async function fetchApi({
  method,
  url,
  data = null,
  headers = {},
  customHeaders = {},
  fullUrl = false,
  ...restProps
}: FetchApiProps) {
  let config = {
    method: method,
    url: fullUrl ? url : `${baseUrl}${url}`,
    data: data,
  };

  const defaultHeaders = {
    Accept: "application/json",
  };

  let jointHeaders = null;

  jointHeaders = {
    headers: {
      ...defaultHeaders,
      ...headers,
      ...customHeaders,
    },
  };

  try {
    return axios({
      ...config,
      ...jointHeaders,
      ...restProps,
    });
  } catch (error) {
    return error;
  }
}
