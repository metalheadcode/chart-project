import { all, fork } from "redux-saga/effects";

import { watchNews } from "./saga/news";
import { watchStocks } from "./saga/stocks";

export default function* rootSaga() {
  yield all([fork(watchStocks), fork(watchNews)]);
}
