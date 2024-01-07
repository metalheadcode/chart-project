import React, { useEffect } from "react";
import { format, subDays } from "date-fns";
import { useDispatch, useSelector } from "react-redux";

import { GET_HISTORY_PRICES_BY_SYMBOL_REQUEST } from "../../redux/constant/stocks";
import ReactModal from "react-modal";

// import { timeParse } from "d3-time-format";

function SearchSymbolModal({
  open,
  onClose,
  chartData,
  symbol,
  setSymbol,
  setChartLabels,
  // setChartDatasets,
  setD3Datasets,
  // setChartDatasetColors,
  setChartData,
  numOfDay,
  symbolLog,
}) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.stocks);

  const fetchChart = (sym, from, to) => {
    dispatch({
      type: GET_HISTORY_PRICES_BY_SYMBOL_REQUEST,
      sym,
      from,
      to,
      onCallback: (response) => {
        if (response.status === 1) {
          // const firstThirtyDays = response.data?.historical?.slice(0, numOfDay);

          // setChartLabels(firstThirtyDays.map((item) => item.date));

          // let finalDatasets = [];
          // let colorEachcandle = [];
          // let finalD3Datasets = [];

          // console.log("thirty days", firstThirtyDays);

          // for (let i = 0; i < numOfDay; i++) {
          //   const date = firstThirtyDays[i].date;
          //   const open = firstThirtyDays[i].open;
          //   const high = firstThirtyDays[i].high;
          //   const low = firstThirtyDays[i].low;
          //   const close = firstThirtyDays[i].close;
          //   const volume = firstThirtyDays[i].volume;

          //   // if (open > close) colorEachcandle.push("rgba(255,26,104,1)");
          //   // if (open < close) colorEachcandle.push("rgba(75,192,192,1)");
          //   // if (open === close) colorEachcandle.push("rgba(0,0,0,1)");

          //   // const finalObj = {
          //   //   x: date,
          //   //   o: open,
          //   //   h: high,
          //   //   l: low,
          //   //   c: close,
          //   //   s: [open, close],
          //   // };

          //   const finalObjD3 = {
          //     date: timeParse("%Y-%m-%d")(date),
          //     // date,
          //     open,
          //     high,
          //     low,
          //     close,
          //     volume,
          //   };

          //   // finalDatasets.push(finalObj);
          //   finalD3Datasets.push(finalObjD3);
          // }

          // setChartDatasets(finalDatasets);
          // setChartDatasetColors(colorEachcandle);

          // MAKE THEM DESCEND
          // const descend = response.data?.historical.sort(
          //   (a, b) =>
          //     new Date(parse(b.date, "yyyy-MM-dd")) -
          //     new Date(parse(a.date, "yyyy-MM-dd"))
          // );
          const descend = response.data?.historical.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );

          console.log("DATA YANG SEBENAR", descend);

          return setD3Datasets(descend);
        }
      },
    });
  };

  useEffect(() => {
    if (symbol !== null && symbolLog.current !== null) {
      const symLog = symbolLog.current[symbol.symbol];
      if (symLog !== undefined) {
        const noDiff = symLog.numOfDay === numOfDay;
        if (!noDiff) {
          fetchChart(
            symbol.symbol,
            symbolLog.current[symbol.symbol].from,
            symbolLog.current[symbol.symbol].to
          );
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numOfDay]);

  return (
    <ReactModal
      ariaHideApp={false}
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          background: "rgba(0,0,0,0.7)",
        },
      }}
      className="w-1/3 rounded-2xl absolute top-1/4 left-1/3 right-1/3 bottom-auto"
    >
      <div className=" p-3 shadow-lg rounded-2xl border border-slate-800 bg-slate-900 flex flex-col gap-2 h-96">
        <input
          placeholder="Search Symbol"
          className="border border-slate-800 bg-slate-900 p-2 rounded-lg text-slate-100"
          onChange={(event) => {
            const value = event.target.value;
            const capital = value.toUpperCase();
            const reg = RegExp(capital, "g");

            const filter = data.filter((item) => item.symbol.match(reg));

            if (filter !== null) {
              const finalData = filter.slice(0, 10);
              setChartData(finalData);
            }
          }}
        />

        <div className="overflow-scroll no-scrollbar overflow-y-auto flex flex-col gap-2">
          {chartData.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                // FETCH NEW CHART INFO
                const from = format(new Date(), "yyyy-MM-dd");
                const to = format(subDays(new Date(), numOfDay), "yyyy-MM-dd");

                setSymbol(item);
                fetchChart(item.symbol, from, to);

                // STORE IN LOG
                let log = {};
                log[item.symbol] = {
                  numOfDay,
                  from,
                  to,
                };
                symbolLog.current = log;

                // CLOSE MODAL
                onClose();
              }}
              className="border border-slate-700 bg-slate-800 hover:bg-slate-700 p-2 rounded-lg  flex justify-between w-full"
            >
              <div className="w-4/6">
                <p className="text-slate-100 font-bold text-xl">
                  {item.symbol}
                </p>
                <p className="text-slate-50 font-light text-sm">{item.name}</p>
              </div>
              <div className="w-2/6 border border-slate-800 bg-slate-900 rounded-md flex justify-center items-center">
                <p className="text-slate-50 font-bold text-2xl">
                  $ {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ReactModal>
  );
}

export default SearchSymbolModal;
