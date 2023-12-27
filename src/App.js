import "./App.css";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { GET_STOCKS_BY_MARKET_REQUEST } from "./redux/constant/stocks";

function App() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.stocks);
  const [market, setMarket] = useState("NASDAQ");

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
      getStocksByMarket(market);
    }
    // axiosCall({
    //   url: `/symbol/${market}`,
    //   method: "get",
    // }).then((res) => console.log("RESPINSE", res));
  }, []);

  return (
    <div className="App">
      <p>Testing</p>
    </div>
  );
}

export default App;
