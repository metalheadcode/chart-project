import { CgArrowRight } from "react-icons/cg";
import { useSelector } from "react-redux";
import { StockState } from "types/redux";

function LabelAndData({ label = "Label", data = "", dataClassName = "" }) {
  return (
    <div>
      <p className="text-slate-500 text-xs">{label}</p>
      <p className={`text-slate-50 font-bold ${dataClassName}`}>{data}</p>
    </div>
  );
}

function HeadInfoV2({ symbol, setOpenMarketModal }: { symbol: any, setOpenMarketModal: any }) {
  const { marketStr } = useSelector((state: {
    stocks: StockState
  }) => state.stocks);
  return (
    <div className="p-3 border-b border-t border-slate-800 bg-slate-900">
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
            className="hover:bg-slate-700 hover:shadow-md bg-slate-800 text-lg font-bold border-2 border-green-500 px-7 py-2 rounded-lg"
          >
            <p className="text-green-500">{marketStr}</p>
          </button>
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

      <div className="bg-gradient-to-r from-green-500  to-teal-600 p-1 rounded-xl">
        <div className="flex justify-between items-center rounded-lg p-3 bg-slate-900">
          <div
            id=""
            className="flex items-center gap-2"
          >
            <button
              onClick={() => {
                setOpenMarketModal(true);
              }}
              className="hover:bg-slate-700 hover:shadow-md bg-slate-800 text-lg font-bold border-2 border-green-500 px-7 py-2 rounded-lg"
            >
              <p className="text-green-500">{marketStr}</p>
            </button>
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
          {/* <LabelAndData
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
          /> */}
        </div>
      </div>
    </div>
  );
}

export default HeadInfoV2;
