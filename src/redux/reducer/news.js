import * as constants from "../constant/news";

const initialState = {
  news: [],
  error: null,
  loading: false,
};

export const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.GET_NEWS_BY_SYMBOL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case constants.GET_NEWS_BY_SYMBOL_SUCCESS: {
      return {
        ...state,
        loading: false,
        news: action.data,
      };
    }
    case constants.GET_NEWS_BY_SYMBOL_FAILURE: {
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
