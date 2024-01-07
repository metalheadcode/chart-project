import { Chart, ChartCanvas } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { CandlestickSeries } from "react-stockcharts/lib/series";
import { MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import React from "react";
import { format } from "d3-format";
import { scaleTime } from "d3-scale";
import { useSelector } from "react-redux";
import { utcDay } from "d3-time";

const GREEN_CANDLE = "rgb(74 222 128)"; // bg-green-500
const RED_CANDLE = "rgb(239 68 68)"; // bg-red-500
const SUBTLE_BORDER = "rgb(30 41 59)"; // bg-slate-800

function CandleStickV2({ datasets }) {
  const { symbolStr } = useSelector((state) => state.stocks);
  if (datasets === undefined) {
    return (
      <div>
        <p>
          undefined datasets, please contact our developers at
          <a
            id="email"
            type="email"
            href="metalheadcoder@gmail.com"
          >
            metalheadcoder@gmail.com
          </a>
        </p>
      </div>
    );
  }

  if (datasets !== undefined) {
    const xAccessor = (d) => {
      if (d !== undefined) {
        return d.date;
      }
    };
    const xExtents = [
      xAccessor(last(datasets)),
      xAccessor(datasets[datasets.length - 100]),
    ];
    return (
      <div className="border-t border-b border-slate-800">
        <ChartCanvas
          height={window.innerHeight - 350}
          ratio={1}
          width={window.innerWidth}
          margin={{ left: 0, right: 50, top: 0, bottom: 50 }}
          type={"svg"}
          seriesName={symbolStr}
          data={datasets}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          xExtents={xExtents}
        >
          <Chart
            id={1}
            yExtents={(d) => [d.high, d.low]}
          >
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={6}
              stroke={SUBTLE_BORDER}
              tickStroke="#FFFFFF"
            />
            <YAxis
              axisAt="right"
              orient="right"
              ticks={5}
              stroke={SUBTLE_BORDER}
              tickStroke="#FFFFFF"
            />

            {/* --- NI BAGI ADA DRAGING MOUSE EFFECT --- */}
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format(".2f")}
            />

            {/* --- ADJUST CANDLESTICK UI DEKAT SINI ---  */}
            <CandlestickSeries
              width={timeIntervalBarWidth(utcDay)}
              fill={(d) => (d.close > d.open ? GREEN_CANDLE : RED_CANDLE)}
              opacity={1}
              stroke={(d) => (d.close > d.open ? GREEN_CANDLE : RED_CANDLE)}
              wickStroke={(d) => (d.close > d.open ? GREEN_CANDLE : RED_CANDLE)}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

export default CandleStickV2;
