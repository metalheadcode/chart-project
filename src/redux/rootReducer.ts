import { combineReducers, Reducer } from '@reduxjs/toolkit';
import { stocksReducer } from './slicers/stocks';
import { newsReducer } from './slicers/news';
import { marketsReducer } from './slicers/markets';
import { RootState } from '../types/redux';

const rootReducer: Reducer<RootState> = combineReducers({
    stocks: stocksReducer,
    news: newsReducer,
    markets: marketsReducer,
});

export default rootReducer; 