import { CandlestickSeries, LineSeries } from "react-stockcharts/lib/series";
import { Chart, ChartCanvas } from "react-stockcharts";
import {
  CurrentCoordinate,
  MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import React, { useContext } from "react";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
  bollingerBand,
  ema,
  stochasticOscillator,
} from "react-stockcharts/lib/indicator";
import { last, timeIntervalBarWidth } from "react-stockcharts/lib/utils";

import { GroupTooltip } from "react-stockcharts/lib/tooltip";
import { SizeContext } from "../../App";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { format } from "d3-format";
import { scaleTime } from "d3-scale";
import { useSelector } from "react-redux";
import { utcDay } from "d3-time";

// COLOR CONFIG
const GREEN_CANDLE = "rgb(74 222 128)"; // bg-green-500
const RED_CANDLE = "rgb(239 68 68)"; // bg-red-500
const SUBTLE_BORDER = "rgb(30 41 59)"; // bg-slate-800

function CandleStickV2({ datasets, activeMenu }) {
  // HOOKS
  const { size } = useContext(SizeContext);
  // CHART CONFIG
  const margin = { left: 0, right: 50, top: 0, bottom: 50 };
  const height = size.height - 220;
  const width = activeMenu === null ? size.width - 60 : size.width - 330;
  const gridHeight = height - margin.top - margin.bottom;
  const gridWidth = width - margin.left - margin.right;

  // INDICATORS
  const ema20 = ema()
    .id(0)
    .options({ windowSize: 20 })
    .merge((d, c) => {
      d.ema20 = c;
    })
    .accessor((d) => d.ema20);

  const ema50 = ema()
    .id(2)
    .options({ windowSize: 50 })
    .merge((d, c) => {
      d.ema50 = c;
    })
    .accessor((d) => d.ema50);

  const slowSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 3 })
    .merge((d, c) => {
      d.slowSTO = c;
    })
    .accessor((d) => d.slowSTO);

  const fastSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 1 })
    .merge((d, c) => {
      d.fastSTO = c;
    })
    .accessor((d) => d.fastSTO);

  const fullSTO = stochasticOscillator()
    .options({ windowSize: 14, kWindowSize: 3, dWindowSize: 4 })
    .merge((d, c) => {
      d.fullSTO = c;
    })
    .accessor((d) => d.fullSTO);

  const bb = bollingerBand()
    .merge((d, c) => {
      d.bb = c;
    })
    .accessor((d) => d.bb);

  const calculatedData = bb(ema20(ema50(slowSTO(fastSTO(fullSTO(datasets))))));
  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date
  );
  const { displayXAccessor } = xScaleProvider(calculatedData);

  const showGrid = true;
  const yGrid = showGrid
    ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.05 }
    : {};
  const xGrid = showGrid
    ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.05 }
    : {};

  //
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
      <div className="border-t border-b border-slate-800 z-0">
        <ChartCanvas
          height={height}
          ratio={1}
          width={width}
          margin={margin}
          type={"svg"}
          seriesName={symbolStr}
          data={datasets}
          xAccessor={xAccessor}
          xScale={scaleTime()}
          displayXAccessor={displayXAccessor}
          xExtents={xExtents}
        >
          <Chart
            id={1}
            yExtents={[(d) => [d.high, d.low], ema20.accessor()]}
          >
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={6}
              stroke={SUBTLE_BORDER}
              tickStroke="#FFFFFF"
              {...xGrid}
            />
            <YAxis
              axisAt="right"
              orient="right"
              ticks={5}
              stroke={SUBTLE_BORDER}
              strokeBottom={SUBTLE_BORDER}
              tickStroke="#FFFFFF"
              {...yGrid}
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

            {/* BILA USER PILIH INDICATOR BARU WUJUD DEKAT SINI ---  */}
            <LineSeries
              yAccessor={ema20.accessor()}
              stroke={ema20.stroke()}
            />

            <CurrentCoordinate
              yAccessor={ema20.accessor()}
              fill={ema20.stroke()}
            />

            <GroupTooltip
              layout="vertical"
              origin={[20, 30]}
              verticalSize={20}
              onClick={(e) => console.log(e)}
              options={[
                {
                  yAccessor: ema20.accessor(),
                  yLabel: `${ema20.type()}(${ema20.options().windowSize})`,
                  valueFill: ema20.stroke(),
                  withShape: true,
                },
                {
                  yAccessor: ema50.accessor(),
                  yLabel: `${ema50.type()}(${ema50.options().windowSize})`,
                  valueFill: ema50.stroke(),
                  withShape: true,
                },
              ]}
            />
          </Chart>
        </ChartCanvas>
      </div>
    );
  }
}

export default CandleStickV2;
