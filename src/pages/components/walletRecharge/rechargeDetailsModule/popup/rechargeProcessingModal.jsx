import { createPortal } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

const RechargeProcessingModal = ({ onClose, handleWalletRecharge }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      handleWalletRecharge();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 h-full flex justify-center items-center z-50 backdrop-blur-xs">
      <div className="bg-[#292929] rounded-lg p-6 w-full max-w-md text-white relative border inner-card-border mx-3">
        {/* <button
          className="absolute text-sm top-4 right-4 text-white hover:text-gray-400"
          onClick={onClose}
        >
          ✕
        </button> */}
        <h2 className="text-[var(--primary-color)] font-bold mb-4 flex items-center gap-2">
          <LoaderCircle size="20" className="animate-spin" /> Processing
          Recharge...
        </h2>
        <div className="flex flex-col items-center my-5">
          <LoaderCircle
            size="60"
            className="animate-spin text-[var(--primary-color)]"
          />
          <p className="text-white font-bold text-lg">
            Processing your payment...
          </p>
          <p className="text-sm font-semibold text-[var(--subheading-color)]">
            Please wait while we confirm your transaction
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default RechargeProcessingModal;
