import React from "react";

function Input({ value, placeholder, onChange }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      className="border border-slate-800 bg-slate-900 p-2 rounded-lg text-slate-100"
      onChange={onChange}
    />
  );
}

export default Input;
