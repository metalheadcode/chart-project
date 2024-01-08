import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
function LabelAndData({ label = "Label", data = "", dataClassName = "" }) {
  return (
    <div className="w-full mb-2 border-b border-slate-800 pb-2">
      <p className="text-slate-500 text-xs">{label}</p>
      <p
        className={`text-slate-50 text-2xl font-bold text-right ${dataClassName}`}
      >
        {data}
      </p>
    </div>
  );
}

function CurrentStock() {
  const { symbolStr, data } = useSelector((state) => state.stocks);
  const symbol = data.find((item) => item.symbol === symbolStr);
  return (
    <>
      {/* TOP INFORMATION HEADER START HERE */}
      <div className=" flex flex-col justify-between items-center">
        <div className="p-3">
          <h2 className="text-xl text-slate-100 font-bold">{symbol.name}</h2>
        </div>
      </div>
      {/* TOP INFORMATION HEADER END HERE */}

      <div className=" flex flex-col justify-between p-3 max-h-full">
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
    </>
  );
}

export default CurrentStock;
