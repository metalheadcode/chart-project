import * as constants from "../constant/stocks";

const initialState = {
  data: [],
  market: null,
  error: null,
  loading: false,
};

export const stocksReducer = (state = initialState, action) => {
  switch (action.type) {
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
        market: action.market,
      };
    }
    case constants.GET_STOCKS_BY_MARKET_FAILURE: {
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
