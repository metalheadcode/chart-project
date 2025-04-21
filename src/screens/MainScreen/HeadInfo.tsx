import { CgArrowRight } from "react-icons/cg";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { StockState } from "types/redux";

function LabelAndData({ label = "Label", data = "", dataClassName = "" }) {
  return (
    <div>
      <p className="text-slate-500 text-xs">{label}</p>
      <p className={`text-slate-50 text-lg font-bold ${dataClassName}`}>
        {data}
      </p>
    </div>
  );
}

function HeadInfo({ symbol, setOpenMarketModal }: { symbol: any, setOpenMarketModal: any }) {
  const { marketStr } = useSelector((state: {
    stocks: StockState
  }) => state.stocks);
  return (
    <div className="shadow-lg p-3 border-b border-t border-slate-800 border-dotted bg-slate-900">
      {/* TOP INFORMATION HEADER START HERE */}
      <div className="flex justify-between items-center mb-3">
        <div
          id=""
          className="flex items-center gap-2"
        >
          {/* <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="hover:bg-slate-700 hover:shadow-md bg-slate-800 text-lg font-bold border-2 border-green-500 px-7 py-2 rounded-lg"
          >
            <p className="text-green-500">{marketStr}</p>
          </button> */}
          <div className="hover:bg-slate-700 hover:shadow-md bg-slate-800 text-lg font-bold border-2 border-green-500 px-7 py-2 rounded-lg">
            <p className="text-green-500">{marketStr}</p>
          </div>
          <CgArrowRight
            className="text-slate-700"
            size={20}
          />
          <button
            onClick={() => {
              setOpenMarketModal(true);
            }}
            className="hover:bg-green-500 hover:shadow-md bg-green-500 text-lg font-bold border border-green-500 px-7 py-2 rounded-lg"
          >
            <p className="text-slate-50">{symbol.symbol}</p>
          </button>
        </div>
        <div className="m-2">
          <h2 className="text-3xl text-slate-100 font-bold">{symbol.name}</h2>
        </div>
      </div>
      {/* TOP INFORMATION HEADER END HERE */}

      <div className="flex justify-between items-center border border-slate-800 rounded-lg p-3 bg-slate-900">
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
