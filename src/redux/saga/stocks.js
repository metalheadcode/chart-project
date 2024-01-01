import { axiosCall } from "../../utils/customAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import * as constants from "../constant/stocks";
import * as functions from "../function/stocks";

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
    yield put(functions.stockMyMarketSuccess(data, market));
  } else {
    onCallback({
      status: 0,
      error,
    });
    yield put(functions.stockMyMarketFailure(error));
  }
}

export function* watchStocks() {
  yield takeLatest(constants.GET_STOCKS_BY_MARKET_REQUEST, getStockByMarket);
}
