import { combineReducers } from "redux";
import { newsReducer } from "./reducer/news";
import { stocksReducer } from "./reducer/stocks";

const rootReducer = combineReducers({
  stocks: stocksReducer,
  news: newsReducer,
});

export default rootReducer;
