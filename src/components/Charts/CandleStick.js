import "chartjs-adapter-date-fns";

import React, { useEffect, useRef, useState } from "react";

import Chart from "chart.js/auto";
import Select from "../Inputs/Select";

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
        ctx.strokeStyle = "rgba(0,0,0,1)";

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

    // const customScale = {
    //   id: "customScale",
    //   afterDatasetsDraw(chart, args, pluginOptions) {
    //     const {
    //       ctx,
    //       data,
    //       chartArea: { top, bottom, left, right, width, height },
    //       scales: { x, y },
    //     } = chart;

    //     ctx.save();

    //     ctx.textAlign = "center";
    //     // ctx.font = "bold 12 px sans-serif";
    //     // ctx.fillStyle = "rgba(102, 102, 102, 1)";

    //     ctx.fillText(
    //       parse(
    //         data.datasets[0].data[0].x,
    //         "yyyy-MM-dd",
    //         new Date()
    //       ).toLocaleString("en", {
    //         day: "numeric",
    //         month: "short",
    //       }),
    //       x.getPixelForValue(String(data.datasets[0].data[0].x)),
    //       bottom + 20
    //     );

    //     // data.datasets[0].data.forEach((datapoint) => {
    //     //   ctx.textAlign = "center";
    //     //   ctx.font = "bold 12 px sans-serif";
    //     //   ctx.fillStyle = "rgba(102, 102, 102, 1)";
    //     //   ctx.fillText(
    //     //     new Date(datapoint.x).toLocaleString("en", dataOptions),
    //     //     x.getPixelForValue(datapoint.x),
    //     //     bottom + 20
    //     //   );
    //     // });
    //   },
    // };
    const config = {
      type: "bar",
      data: {
        // labels: chartLabels,
        datasets: [
          {
            label: symbol.symbol,
            data: chartDatasets,
            backgroundColor: chartDatasetColors,
            borderColor: "rgba(0,0,0,1)",
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
            beginAtZero: true,
            grace: "20%",
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
    <div className="border border-blue-600 p-3 rounded-xl bg-white shadow-lg">
      <div className="border border-slate-100 p-3 rounded-lg mb-2 flex gap-3">
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
