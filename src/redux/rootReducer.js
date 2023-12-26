import { combineReducers } from "redux";
import { stocksReducer } from "./reducer/stocks";

const rootReducer = combineReducers({
  stocks: stocksReducer,
});

export default rootReducer;
