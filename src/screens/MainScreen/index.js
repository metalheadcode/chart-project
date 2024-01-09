import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CandleStickV2 from "../../components/Charts/CandleStickV2";
import CurrentStock from "./Menu/CurrentStock";
import EmaConfigModal from "./EmaConfigModal";
import { GET_STOCKS_BY_MARKET_REQUEST } from "../../redux/constant/stocks";
import HeadInfo from "./HeadInfo";
import IndicatorList from "./Menu/IndicatorList";
import News from "./Menu/News";
import SearchSymbolModal from "./SearchSymbolModal";
import SideInfo from "./SideInfo";
import SideMenu from "./SideMenu";
import { SizeContext } from "../../App";

function MainScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const { size } = useContext(SizeContext);
  const { data, marketStr, loading } = useSelector((state) => state.stocks);
  const symbolLog = useRef(null);

  // MODALS
  const [openMarketModal, setOpenMarketModal] = useState(false);
  const [openEMAConfigModal, setOpenEMAConfigModal] = useState(false);

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
  const [indicators, setIndicators] = useState(["ema20", "ema50"]);
  const [activeMenu, setActiveMenu] = useState(null);
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
      <EmaConfigModal
        open={openEMAConfigModal}
        onClose={() => setOpenEMAConfigModal(false)}
      />

      {/* --- HEADER ---  */}
      {symbol !== null && (
        <HeadInfo
          symbol={symbol}
          setOpenMarketModal={setOpenMarketModal}
        />
      )}

      <div className="z-0 flex flex-row">
        {/* --- LEFT SIDE ---  */}
        <div
          className="chart-section z-0"
          style={{
            width: activeMenu === null ? size.width - 60 : size.width - 330,
          }}
        >
          {loading && (
            <div className="h-full w-full flex justify-center items-center">
              <p className="text-white">Fetching data...</p>
            </div>
          )}
          {!loading && d3Datasets !== null && d3Datasets !== undefined && (
            <CandleStickV2
              datasets={d3Datasets}
              activeMenu={activeMenu}
              indicators={indicators}
            />
          )}
        </div>

        {/* --- RIGHT SIDE --- */}
        {activeMenu !== null && (
          <div
            className="expand-section z-0"
            style={{ width: 270 }}
          >
            {symbol !== null && (
              <SideInfo>
                {activeMenu === 1 && <CurrentStock />}
                {activeMenu === 2 && (
                  <IndicatorList
                    indicators={indicators}
                    setIndicators={setIndicators}
                    setOpenEMAConfigModal={setOpenEMAConfigModal}
                  />
                )}
                {activeMenu === 3 && <News />}
              </SideInfo>
            )}
          </div>
        )}

        <div
          className="menu-section z-0"
          style={{ width: 60 }}
        >
          {symbol !== null && (
            <SideMenu
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
