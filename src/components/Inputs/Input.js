import React from "react";

function Input({ value, placeholder, onChange, helperText = "" }) {
  return (
    <div>
      <input
        value={value}
        placeholder={placeholder}
        className="w-full border border-slate-800 bg-slate-900 p-2 rounded-lg text-slate-100"
        onChange={onChange}
      />
      <p
        className="text-slate-500 ml-1 mt-1"
        style={{ fontSize: 10 }}
      >
        {helperText}
      </p>
    </div>
  );
}

export default Input;
