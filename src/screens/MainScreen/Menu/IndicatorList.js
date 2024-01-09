import React from "react";
import { RiSettings5Fill } from "react-icons/ri";
import { listOfIndicatorsAvailable } from "../../../utils/indicatorsList";

export const ButtonLabel = ({ label }) => (
  <div className="w-full">
    <p className="text-white text-center font-bold">{label}</p>
  </div>
);

function IndicatorList({ indicators, setIndicators, setOpenEMAConfigModal }) {
  return (
    <div className="p-2">
      {listOfIndicatorsAvailable.map((item) => {
        if (indicators.includes(item.name)) {
          return (
            <div
              key={item.id}
              className="h-10 flex flex-row gap-2 items-center  mb-2"
            >
              <button
                onClick={() => {
                  let result = [...indicators];
                  result = result.filter((i) => i !== item.name);
                  return setIndicators(result);
                }}
                className="rounded-lg h-full w-10/12 bg-slate-600 flex justify-center items-center"
              >
                <ButtonLabel label={item.name.toUpperCase()} />
              </button>
              <button
                className="rounded-lg h-full w-2/12 bg-green-500 flex justify-center items-center"
                onClick={() => {
                  setOpenEMAConfigModal((prev) => !prev);
                }}
              >
                <RiSettings5Fill color="white" />
              </button>
            </div>
          );
        }

        if (!indicators.includes(item.name)) {
          return (
            <button
              key={item.id}
              className="h-10 mb-2 rounded-lg px-3 py-2 w-full bg-slate-800"
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
