import * as constants from "../constant/stocks";

// REQ BY MARKET
export function stockByMarketSuccess(data, market) {
  return {
    type: constants.GET_STOCKS_BY_MARKET_SUCCESS,
    data,
    market,
  };
}

export function stockByMarketFailure(error) {
  return {
    type: constants.GET_STOCKS_BY_MARKET_FAILURE,
    error,
  };
}

// REQ BY SYMBOL
export function historyPricesBySymbolSuccess(data) {
  return {
    type: constants.GET_HISTORY_PRICES_BY_SYMBOL_SUCCESS,
    data,
  };
}

export function historyPricesBySymbolFailure(error) {
  return {
    type: constants.GET_HISTORY_PRICES_BY_SYMBOL_FAILURE,
    error,
  };
}
