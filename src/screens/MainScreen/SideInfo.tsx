import React from "react";

function SideInfo({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l border-b border-slate-800 h-full bg-slate-700">
      {children}
    </div>
  );
}

export default SideInfo;
