import * as constants from "../constant/stocks";

export function stockMyMarketSuccess(data, market) {
  return {
    type: constants.GET_STOCKS_BY_MARKET_SUCCESS,
    data,
    market,
  };
}

export function stockMyMarketFailure(error) {
  return {
    type: constants.GET_STOCKS_BY_MARKET_FAILURE,
    error,
  };
}
