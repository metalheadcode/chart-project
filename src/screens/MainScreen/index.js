import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CandleStickV2 from "../../components/Charts/CandleStickV2";
import { GET_STOCKS_BY_MARKET_REQUEST } from "../../redux/constant/stocks";
import HeadInfo from "./HeadInfo";
import Marquee from "react-fast-marquee";
import SearchSymbolModal from "./SearchSymbolModal";
import SideInfo from "./SideInfo";

function MainScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const { data, marketStr, loading } = useSelector((state) => state.stocks);
  const symbolLog = useRef(null);

  // MODALS
  const [openMarketModal, setOpenMarketModal] = useState(false);

  // STATES
  const [chartData, setChartData] = useState([]);
  const [symbol, setSymbol] = useState({
    symbol: "AACIW",
    name: "Armada Acquisition Corp. I",
    price: 0.025,
    changesPercentage: 0,
    change: 0,
    dayLow: 0.025,
    dayHigh: 0.0251,
    yearHigh: 0.0251,
    yearLow: 0.025,
    marketCap: 215300,
    priceAvg50: 0,
    priceAvg200: 0,
    exchange: "NASDAQ",
    volume: 6200,
    avgVolume: 0,
    open: 0.02505,
    previousClose: 0.025,
    eps: 0,
    pe: null,
    earningsAnnouncement: "2023-03-31T00:00:00.000+0000",
    sharesOutstanding: 8612000,
    timestamp: 1703192328,
  });

  // CHART STATE
  const [d3Datasets, setD3Datasets] = useState(null);
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
        setSymbol={setSymbol}
        setD3Datasets={setD3Datasets}
        setChartData={setChartData}
        numOfDay={numOfDay}
        symbolLog={symbolLog}
      />

      <div className="z-0 flex flex-row">
        {/* --- LEFT SIDE ---  */}
        <div className="w-5/6">
          {symbol !== null && (
            <HeadInfo
              symbol={symbol}
              setOpenMarketModal={setOpenMarketModal}
            />
          )}

          <div>
            <Marquee className="w-full">
              {["news 1", "news 2"].map((text, index) => (
                <div
                  key={index}
                  className="mr-2"
                >
                  <p className="text-slate-100 font-light text-xs">{text}</p>
                </div>
              ))}
            </Marquee>
          </div>

          <div className="flex gap-2">
            {loading && (
              <div className="h-full w-full flex justify-center items-center">
                <p>Fetching data...</p>
              </div>
            )}
            {!loading && d3Datasets !== null && d3Datasets !== undefined && (
              <div className="w-full z-0">
                <CandleStickV2 datasets={d3Datasets} />
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="w-1/5">
          {symbol !== null && (
            <SideInfo
              symbol={symbol}
              setOpenMarketModal={setOpenMarketModal}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
