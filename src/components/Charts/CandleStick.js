import "chartjs-adapter-date-fns";

import React, { useEffect, useRef, useState } from "react";

import Chart from "chart.js/auto";
import Select from "../Inputs/Select";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(zoomPlugin);

function CandleStick({
  symbol,
  chartDatasets,
  chartDatasetColors,
  numOfDay,
  setNumOfDay,
  symbolLog,
}) {
  const ref = useRef(null);
  const chart = useRef(null);

  const generateChart = (element) => {
    // CANDLESTICK / SHADOW PLUGIN
    const candlestick = {
      id: "candlestick",
      beforeDatasetsDraw(chart, args, pluginOptions) {
        const {
          ctx,
          data,
          scales: { y },
        } = chart;

        ctx.save();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgb(250,250,250)";

        data.datasets[0].data.forEach((item, index) => {
          // TOP SHADOW
          ctx.beginPath();
          ctx.moveTo(
            chart.getDatasetMeta(0).data[index].x,
            chart.getDatasetMeta(0).data[index].y
          );
          ctx.lineTo(
            chart.getDatasetMeta(0).data[index].x,
            y.getPixelForValue(data.datasets[0].data[index].h)
          );
          ctx.stroke();

          // BOTTOM SHADOW
          ctx.beginPath();
          ctx.moveTo(
            chart.getDatasetMeta(0).data[index].x,
            chart.getDatasetMeta(0).data[index].y
          );
          ctx.lineTo(
            chart.getDatasetMeta(0).data[index].x,
            y.getPixelForValue(data.datasets[0].data[index].l)
          );
          ctx.stroke();
        });
      },
    };

    const minAndMaxDatasets = (dataset) => {
      let max = dataset[0].h;
      let min = dataset[0].l;

      for (let i = 0; i < dataset.length; i++) {
        const value = dataset[i];

        // h HIGHER THAN MAX ?
        if (value.h > max) {
          max = value.h;
        }

        // l LOWER THAN MIN ?
        if (value.l < min) {
          min = value.l;
        }
      }

      return { min, max };
    };
    const config = {
      type: "bar",
      data: {
        // labels: chartLabels,
        datasets: [
          {
            label: symbol.symbol,
            data: chartDatasets,
            backgroundColor: chartDatasetColors,
            borderWidth: 1.5,
            borderSkipped: false, // FIX BORDER BOTTOM MISSING
          },
        ],
      },
      options: {
        layout: {
          padding: {
            bottom: 20,
          },
        },
        parsing: {
          xAxisKey: "x",
          yAxisKey: "s",
        },
        scales: {
          x: {
            type: "timeseries",
            time: {
              unit: "day",
            },
            grid: {
              display: false,
            },
          },
          y: {
            position: "right",
            grid: {
              color: "rgb(30 41 59)", // options.scales.y.grid.color
            },
            min: minAndMaxDatasets(chartDatasets).min,
            max: minAndMaxDatasets(chartDatasets).max,
            ticks: {
              stepSize:
                (minAndMaxDatasets(chartDatasets).max -
                  minAndMaxDatasets(chartDatasets).min) /
                20, // VALUE NI YANG BUATKAN MAKIN DETAILS
            },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true,
              },
              mode: "y",
            },
          },
        },
      },
      plugins: [candlestick],
    };

    chart.current = new Chart(element, config);
  };

  useEffect(() => {
    if (ref !== null) {
      const ctx = ref.current;

      if (chart.current !== null) {
        chart.current.destroy();
        generateChart(ctx);
      } else {
        generateChart(ctx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartDatasets]);

  const [unit, setUnit] = useState("d");

  return (
    <div className="border-y border-slate-800 bg-slate-900 p-3 shadow-lg">
      <div className="border border-slate-800 bg-slate-950 p-3 rounded-lg mb-2 flex gap-3">
        <Select
          options={[
            { label: "Day", value: "d" },
            { label: "Month", value: "m" },
            { label: "Year", value: "y" },
          ]}
          onSelect={(value) => setUnit(value)}
          value={unit}
          label="Unit"
        />
        <Select
          options={[
            { label: "30", value: 30 },
            { label: "60", value: 60 },
            { label: "90", value: 90 },
            { label: "120", value: 120 },
          ]}
          onSelect={(value) => {
            setNumOfDay(value);
            // STORE IN LOG
            if (symbolLog.current !== null) {
              let log = {};
              log[symbol.symbol] = {
                numOfDay: value,
                from: symbolLog.current[symbol.symbol].from,
                to: symbolLog.current[symbol.symbol].to,
              };
              symbolLog.current = log;
            }
          }}
          value={numOfDay}
          label="Unit"
        />
      </div>
      <canvas
        ref={ref}
        id="candle-stick"
      ></canvas>
    </div>
  );
}

export default CandleStick;
