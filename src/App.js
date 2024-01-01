import "./App.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GET_STOCKS_BY_MARKET_REQUEST } from "./redux/constant/stocks";
import MainScreen from "./screens/MainScreen";

function App() {
  const dispatch = useDispatch();
  const { data, loading, market } = useSelector((state) => state.stocks);

  // MARKET AS mkt
  const [mkt, setMkt] = useState("NASDAQ");

  const getStocksByMarket = (m) => {
    dispatch({
      type: GET_STOCKS_BY_MARKET_REQUEST,
      market: m,
      onCallback: (response) => {
        if (response.status === 0) {
          return alert(response.error);
        }
      },
    });
  };

  useEffect(() => {
    if (data.length === 0) {
      getStocksByMarket(mkt);
    }
  }, []);

  return (
    <div className="App">
      <MainScreen />
    </div>
  );
}

export default App;
