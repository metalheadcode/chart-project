import React from "react";

function Select({ options = [], onSelect, value, label = "Label" }) {
  const val = options.find((item) => item.value === value);
  return (
    <div className="">
      <div
        className=" text-slate-500"
        style={{ marginBottom: 7, marginLeft: 2 }}
      >
        <p className="text-xs text-slate-500">{label}</p>
      </div>
      <div className="mt-1">
        <select
          value={val === undefined ? "Please Choose" : val.label}
          id="days-input-option"
          className="mt-1 border border-slate-200 p-3 rounded-md"
          onChange={(event) => {
            const value = event.target.value;
            const finalVal = options.find((item) => item.label === value).value;
            if (value !== undefined) {
              onSelect(finalVal);
            } else {
              onSelect("");
            }
          }}
        >
          {options.map((item, index) => (
            <option key={index}>{item.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Select;
