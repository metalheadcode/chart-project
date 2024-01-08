import CurrentStock from "./Menu/CurrentStock";
import IndicatorList from "./Menu/IndicatorList";
import React from "react";
import { menuList } from "./MenuList";

function SideInfo({ activeMenu }) {
  return (
    <div className="border-l border-b border-slate-800 h-full">
      <div className="border-b border-slate-800 p-3">
        <p className="text-white text-lg font-bold text-center">
          {menuList.find((item) => item.id === activeMenu).title}
        </p>
      </div>
      {activeMenu === 1 && <CurrentStock />}
      {activeMenu === 2 && <IndicatorList />}
      {activeMenu === 3 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 1...
          </p>
        </div>
      )}
      {activeMenu === 4 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 2...
          </p>
        </div>
      )}
      {activeMenu === 5 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 3...
          </p>
        </div>
      )}
      {activeMenu === 6 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 4...
          </p>
        </div>
      )}
      {activeMenu === 7 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 5...
          </p>
        </div>
      )}
      {activeMenu === 8 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 6...
          </p>
        </div>
      )}
      {activeMenu === 9 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-white font-bold text-center">
            Coming soon info 7...
          </p>
        </div>
      )}
    </div>
  );
}

export default SideInfo;
