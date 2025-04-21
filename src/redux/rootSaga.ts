import { all } from 'redux-saga/effects';
import { watchStocks } from './saga/stocks';
import { watchNews } from './saga/news';

export default function* rootSaga() {
    yield all([
        watchStocks(),
        watchNews(),
    ]);
} 