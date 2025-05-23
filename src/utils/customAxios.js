import * as ax from "axios";

const axios = ax.default.create();

// KAT SINI AKU NAK INTERCEPT HTTP
axios.interceptors.response.use(
  (response) => {
    // RESTRUCTURE RESPONSE DEKAT SINI

    if (
      response.status === 200 &&
      response.data["Error Message"] !== undefined
    ) {
      return {
        status: 500,
        data: response.data["Error Message"],
      };
    }

    return {
      status: response.status,
      data: response.data,
    };
  },
  (error) => {
    return {
      status: error.response.status,
      error: {
        code: error.response.status,
        message: error.response.data["Error Message"],
      },
    };
  }
);

export const axiosCall = async (config) => {
  // METHOD
  let method = config.method;
  // URL
  // let url = config.url;

  let url = `${process.env.REACT_APP_API_URL}${config.url}`;

  // HEADERS
  let headers;

  // DATA
  let data = config.data;

  // PARAMS
  let params = config.params;

  // FINAL
  return axios({
    method,
    url,
    headers,
    data,
    params: {
      ...params,
      apikey: process.env.REACT_APP_API_KEY,
    },
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default axios;
