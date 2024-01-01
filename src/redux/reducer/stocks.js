import * as constants from "../constant/stocks";

import tempData from "../../utils/tempDummyData.json";

const initialState = {
  data: [...tempData.data],
  marketStr: "NASDAQ",
  symbolStr: null,
  error: null,
  loading: false,
};

export const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
    // BY MARKET
    case constants.GET_STOCKS_BY_MARKET_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.GET_STOCKS_BY_MARKET_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.data,
        marketStr: action.market,
      };
    }
    case constants.GET_STOCKS_BY_MARKET_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    // BY SYMBOL
    case constants.GET_HISTORY_PRICES_BY_SYMBOL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.GET_HISTORY_PRICES_BY_SYMBOL_SUCCESS: {
      return {
        ...state,
        loading: false,
        prices: action.data.historical,
        symbolStr: action.data.symbol,
      };
    }
    case constants.GET_HISTORY_PRICES_BY_SYMBOL_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};
