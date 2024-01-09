import React from "react";

function Header() {
  return (
    <div className="p-2 flex">
      <div className="flex mr-2">
        <div className="h-4 w-4 bg-slate-50 mr-2" />
        <p className="text-slate-500 text-xs text-center font-light">
          ChartProject
        </p>
      </div>
    </div>
  );
}

export default Header;
