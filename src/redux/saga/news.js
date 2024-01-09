import * as constants from "../constant/news";
import * as functions from "../function/news";

import { call, put, takeLatest } from "redux-saga/effects";

import { axiosCall } from "../../utils/customAxios";

function* getNewsBySymbol({ params, onCallback }) {
  // page, tickers, limit
  const { status, data, error } = yield call(axiosCall, {
    url: `/stock_news`,
    method: "get",
    params: {
      ...params,
      limit: 50,
    },
  });

  console.log("ERROR KE", status, data, error);

  if (status === 200) {
    onCallback({
      status: 1,
      data,
    });
    yield put(functions.newsBySymbolSuccess(data));
  } else {
    onCallback({
      status: 0,
      error,
    });
    yield put(functions.newsBySymbolFailure(error));
  }
}

export function* watchNews() {
  yield takeLatest(constants.GET_NEWS_BY_SYMBOL_REQUEST, getNewsBySymbol);
}
