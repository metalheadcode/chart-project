import { Chart, ChartCanvas } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { CandlestickSeries } from "react-stockcharts/lib/series";
import React from "react";
import { scaleTime } from "d3-scale";
import { useSelector } from "react-redux";
import { utcDay } from "d3-time";

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
      <ChartCanvas
        height={window.innerHeight - 350}
        ratio={1}
        width={window.innerWidth}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
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
          />
          <YAxis
            axisAt="right"
            orient="right"
            ticks={5}
          />
          <CandlestickSeries width={timeIntervalBarWidth(utcDay)} />
        </Chart>
      </ChartCanvas>
    );
  }
}

export default CandleStickV2;
