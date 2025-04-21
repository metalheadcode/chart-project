import CustomModal from "../../components/CustomModal";
import React from "react";
import { TbProgressAlert } from "react-icons/tb";
function EmaConfigModal({ open, onClose, title = "IndicatorName" }: { open: boolean, onClose: () => void, title: string }) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
    >
      <div className=" p-3 shadow-lg rounded-2xl border border-slate-800 bg-slate-900 flex flex-col gap-2 h-96">
        <p className="text-white font-bold text-xl">{title}</p>

        <div className="bg-slate-950 flex flex-col justify-center items-center h-full w-full border border-slate-800 rounded-md p-5">
          <TbProgressAlert
            className="text-slate-600 mb-3"
            size={45}
          />
          <p className="text-slate-600 text-sm text-center">
            [WIP] This modal will serve the purpose of managing the selected
            indicator. Users will be able to change the chart color and sizes of
            the indicator.
          </p>
        </div>
      </div>
    </CustomModal>
  );
}

export default EmaConfigModal;
