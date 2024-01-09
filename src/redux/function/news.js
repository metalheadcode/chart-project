import * as constants from "../constant/news";

// REQ BY MARKET
export function newsBySymbolSuccess(data, market) {
  return {
    type: constants.GET_NEWS_BY_SYMBOL_SUCCESS,
    data,
    market,
  };
}

export function newsBySymbolFailure(error) {
  return {
    type: constants.GET_NEWS_BY_SYMBOL_FAILURE,
    error,
  };
}
