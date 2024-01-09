import * as constants from "../constant/stocks";
import * as functions from "../function/stocks";

import { call, put, takeLatest } from "redux-saga/effects";

import { axiosCall } from "../../utils/customAxios";

function* getStockByMarket({ market, onCallback }) {
  const { status, data, error } = yield call(axiosCall, {
    url: `/symbol/${market}`,
    method: "get",
  });
  if (status === 200) {
    onCallback({
      status: 1,
      data,
    });
    yield put(functions.stockByMarketSuccess(data, market));
  } else {
    onCallback({
      status: 0,
      error,
    });
    yield put(functions.stockByMarketFailure(error));
  }
}

function* getHistoryPricesBySymbol({ sym, from, to, onCallback }) {
  const { status, data, error } = yield call(axiosCall, {
    url: `/historical-price-full/${sym}?from=${from}&to=${to}`,
    method: "get",
  });

  if (status === 200) {
    onCallback({
      status: 1,
      data,
    });
    yield put(functions.historyPricesBySymbolSuccess(data));
  } else {
    onCallback({
      status: 0,
      error,
    });
    yield put(functions.historyPricesBySymbolFailure(error));
  }
}

export function* watchStocks() {
  yield takeLatest(constants.GET_STOCKS_BY_MARKET_REQUEST, getStockByMarket);
  yield takeLatest(
    constants.GET_HISTORY_PRICES_BY_SYMBOL_REQUEST,
    getHistoryPricesBySymbol
  );
}
