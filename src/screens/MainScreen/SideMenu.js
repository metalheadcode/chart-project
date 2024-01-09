import React from "react";
import { menuList } from "./MenuList";

function SideMenu({ activeMenu, setActiveMenu }) {
  return (
    <div className="border-b border-l border-slate-800 p-2 h-full flex flex-col gap-2">
      {menuList.map((item, index) => (
        <button
          onClick={() => {
            if (activeMenu === item.id) {
              return setActiveMenu(null);
            } else {
              return setActiveMenu(item.id);
            }
          }}
          key={index}
          className={`hover:bg-slate-800 border-2 rounded-lg flex justify-center items-center ${
            activeMenu === item.id
              ? "bg-slate-800 border-green-500"
              : "border-slate-800"
          }`}
          style={{ height: 43 }}
        >
          {activeMenu === item.id ? item.iconActive : item.icon}
        </button>
      ))}
    </div>
  );
}

export default SideMenu;
