import { CgArrowRight } from "react-icons/cg";
import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function LabelAndData({ label = "Label", data = "", dataClassName = "" }) {
  return (
    <div>
      <p className="text-slate-400 text-xs">{label}</p>
      <p className={`text-slate-500 text-lg font-bold ${dataClassName}`}>
        {data}
      </p>
    </div>
  );
}

function HeadInfo({ symbol, setOpenMarketModal }) {
  const { marketStr } = useSelector((state) => state.stocks);
  return (
    <div className="bg-white border border-slate-200 shadow-lg p-3 rounded-xl">
      {/* TOP INFORMATION HEADER START HERE */}
      <div className="flex justify-between items-center mb-3">
        <div
          id=""
          className="flex items-center gap-2"
        >
          <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="hover:bg-white hover:shadow-md bg-slate-50 text-lg font-bold border border-slate-100 p-2 rounded-lg"
          >
            {marketStr}
          </button>
          <CgArrowRight />
          <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="hover:bg-white hover:shadow-md bg-slate-50 text-lg font-bold border border-slate-100 p-2 rounded-lg"
          >
            {symbol.symbol}
          </button>
        </div>
        <div className="m-2">
          <h2 className="text-lg">{symbol.name}</h2>
        </div>
      </div>
      {/* TOP INFORMATION HEADER END HERE */}

      <div className="flex justify-between items-center border border-slate-100 rounded-lg p-3 bg-white">
        <LabelAndData
          label="Price"
          data={`$ ${symbol.price}`}
        />
        <LabelAndData
          label="MA 50"
          data={`$ ${symbol.priceAvg50}`}
        />
        <LabelAndData
          label="MA 200"
          data={`$ ${symbol.priceAvg200}`}
        />
        <LabelAndData
          label="Changes"
          data={symbol.change}
          dataClassName={
            Number(symbol.change) < 0 ? "text-red-400" : "text-teal-500"
          }
        />
        <LabelAndData
          label="Day Low"
          data={symbol.dayLow}
        />
        <LabelAndData
          label="Day High"
          data={symbol.dayHigh}
        />
        <LabelAndData
          label="Year Low"
          data={symbol.yearLow}
        />
        <LabelAndData
          label="Year High"
          data={symbol.yearHigh}
        />
        <LabelAndData
          label="Market Capital"
          data={symbol.marketCap}
        />
        <LabelAndData
          label="Time"
          data={format(symbol.timestamp, "HH:mm")}
        />
      </div>
    </div>
  );
}

export default HeadInfo;
