import React from "react";
import { listOfIndicatorsAvailable } from "../../../utils/indicatorsList";

export const ButtonLabel = ({ label }) => (
  <p className="text-white text-center font-bold">{label}</p>
);

function IndicatorList({ indicators, setIndicators }) {
  return (
    <div className="p-3">
      {listOfIndicatorsAvailable.map((item) => {
        if (indicators.includes(item.name)) {
          return (
            <button
              key={item.id}
              className="mb-2 border border-slate-800 rounded-lg p-3 w-full bg-green-500"
              onClick={() => {
                let result = [...indicators];
                result = result.filter((i) => i !== item.name);
                return setIndicators(result);
              }}
            >
              <ButtonLabel label={item.name.toUpperCase()} />
            </button>
          );
        }

        if (!indicators.includes(item.name)) {
          return (
            <button
              key={item.id}
              className="mb-2 border border-slate-800 rounded-lg p-3 w-full "
              onClick={() => {
                let result = [...indicators];
                result.push(item.name);
                return setIndicators(result);
              }}
            >
              <ButtonLabel label={item.name.toUpperCase()} />
            </button>
          );
        }
      })}
    </div>
  );
}

export default IndicatorList;
