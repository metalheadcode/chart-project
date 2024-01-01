import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CandleStick from "../../components/Charts/CandleStick";
import { GET_STOCKS_BY_MARKET_REQUEST } from "../../redux/constant/stocks";
import HeadInfo from "./HeadInfo";
import SearchSymbolModal from "./SearchSymbolModal";

function MainScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const { data, marketStr } = useSelector((state) => state.stocks);
  const symbolLog = useRef(null);

  // MODALS
  const [openMarketModal, setOpenMarketModal] = useState(false);

  // STATES
  const [chartData, setChartData] = useState([]);
  const [symbol, setSymbol] = useState(null);

  // CHART STATE
  const [chartLabels, setChartLabels] = useState(null);
  const [chartDatasets, setChartDatasets] = useState(null);
  const [chartDatasetColors, setChartDatasetColors] = useState(null);
  const [numOfDay, setNumOfDay] = useState(30);

  // FUNCTIONS
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
    if (data.length === 0 && (marketStr !== null || marketStr !== undefined)) {
      getStocksByMarket(marketStr);
    }
    if (data.length > 0) {
      setChartData(data.slice(0, 10));
      setOpenMarketModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative">
      <SearchSymbolModal
        open={openMarketModal}
        onClose={() => setOpenMarketModal(false)}
        chartData={chartData}
        symbol={symbol}
        setSymbol={setSymbol}
        setChartLabels={setChartLabels}
        setChartDatasets={setChartDatasets}
        setChartDatasetColors={setChartDatasetColors}
        setChartData={setChartData}
        numOfDay={numOfDay}
        symbolLog={symbolLog}
      />
      <div className="flex flex-col z-0">
        {symbol !== null && (
          <HeadInfo
            symbol={symbol}
            setOpenMarketModal={setOpenMarketModal}
          />
        )}
        <div className="flex gap-2">
          {symbol !== null &&
            chartLabels !== null &&
            chartDatasets !== null && (
              <div className="w-full">
                <CandleStick
                  symbol={symbol}
                  chartDatasets={chartDatasets}
                  chartDatasetColors={chartDatasetColors}
                  numOfDay={numOfDay}
                  setNumOfDay={setNumOfDay}
                  symbolLog={symbolLog}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
