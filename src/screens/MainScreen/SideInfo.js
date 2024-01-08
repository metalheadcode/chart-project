import { CgArrowDown } from "react-icons/cg";
import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function LabelAndData({ label = "Label", data = "", dataClassName = "" }) {
  return (
    <div className="w-full mb-1">
      <p className="text-slate-500 text-xs">{label}</p>
      <p className={`text-slate-50 text-lg font-bold ${dataClassName}`}>
        {data}
      </p>
    </div>
  );
}

function SideInfo({ symbol, setOpenMarketModal }) {
  const { marketStr } = useSelector((state) => state.stocks);
  return (
    <div className="border border-slate-800 h-full">
      {/* TOP INFORMATION HEADER START HERE */}
      <div className="border border-white flex flex-col justify-between items-center">
        <div className="p-3">
          <h2 className="text-xl text-slate-100 font-bold">{symbol.name}</h2>
        </div>
        <div
          id=""
          className="flex flex-col items-center gap-2 w-full p-3"
        >
          <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="w-full hover:bg-slate-700 hover:shadow-md bg-slate-900 text-lg font-bold border border-slate-800 p-2 rounded-lg"
          >
            <p className="text-slate-100">{marketStr}</p>
          </button>
          <CgArrowDown className="text-slate-700" />
          <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="w-full hover:bg-green-500 hover:shadow-md bg-green-500 text-lg font-bold border border-slate-800 p-2 rounded-lg"
          >
            <p className="text-slate-50">{symbol.symbol}</p>
          </button>
        </div>
      </div>
      {/* TOP INFORMATION HEADER END HERE */}

      <div className="border border-white flex flex-col justify-between p-3 max-h-full">
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

export default SideInfo;
