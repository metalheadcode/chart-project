import React from "react";

function Select({ options = [], onSelect, value, label = "Label" }) {
  const val = options.find((item) => item.value === value);
  return (
    <div className="border border-slate-800 bg-slate-900 rounded-md px-2 py-1">
      <div className="text-slate-500">
        <p
          className="text-xs text-slate-500"
          style={{ fontSize: 8 }}
        >
          {label}
        </p>
      </div>
      {value !== undefined && (
        <select
          value={val === undefined ? "Please Choose" : val.label}
          id="days-input-option"
          className="bg-slate-900  text-slate-100"
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
            <option key={index}>
              <p className="text-slate-100">{item.label}</p>
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default Select;
