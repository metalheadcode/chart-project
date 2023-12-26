import * as ax from "axios";

const axios = ax.default.create();

// KAT SINI AKU NAK INTERCEPT HTTP
axios.interceptors.response.use(
  (response) => {
    // RESTRUCTURE RESPONSE DEKAT SINI
  },
  (error) => {
    // RESTRUCTURE ERROR DEKAT SINI
  }
);

export const call = async (config) => {
  // METHOD

  // URL

  // DATA

  // PARAMS

  // HEADERS

  // AUTH

  // FINAL
  return axios({
    method: "",
    url: "",
    data: "",
    params: "",
    headers: "",
    auth: "",
  });
};

export default axios;
