import { axiosCall } from "../../utils/customAxios";
import { call, put, takeLatest } from "redux-saga/effects";
import * as constants from "../constant/stocks";
import * as functions from "../function/stocks";

function* getStockByMarket({ market, onCallback }) {
  console.log("II", market);
  const { status, data, error } = yield call(axiosCall, {
    url: `/symbol/${market}`,
    method: "get",
  });

  console.log("APA RESPONNYA", status, data, error);

  if (status === 200) {
    onCallback({
      status: 1,
      data,
    });
    yield put(functions.stockMyMarketSuccess(data));
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
