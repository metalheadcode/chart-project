import { all, fork } from "redux-saga/effects";
import { watchStocks } from "./saga/stocks";

export default function* rootSaga() {
  yield all([fork(watchStocks)]);
}
