import CustomModal from "../../components/CustomModal";
import React from "react";

function EmaConfigModal({ open, onClose }) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
    >
      <div className=" p-3 shadow-lg rounded-2xl border border-slate-800 bg-slate-900 flex flex-col gap-2 h-96">
        <p className="text-white font-bold text-xl">EMA</p>
      </div>
    </CustomModal>
  );
}

export default EmaConfigModal;
