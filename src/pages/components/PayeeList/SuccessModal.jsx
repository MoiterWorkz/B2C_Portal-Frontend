import React from "react";
import {
  CheckCircle2,
  CheckCircleIcon,
  LucideCircleCheck,
  X,
} from "lucide-react";

const SuccessModal = ({ isOpen, onClose, payee, amount }) => {
  if (!isOpen || !payee) return null;

  const transactionId = "MW" + Math.floor(Math.random() * 1000000000);
  const date = new Date().toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className=" bg-card green-border  text-white rounded-xl w-[380px] p-6 relative shadow-xl">
        <div className="mb-8">
          <span className="text-green-500 flex gap-2 small-text">
            <CheckCircleIcon size={18} /> Transfer Successful!
          </span>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <CheckCircleIcon size={60} className="text-green-500 mb-3" />
          <h2 className="text-green-500 font-semibold small-text">
            Transfer Successful!
          </h2>
          <p className="text-gray-300 small-text mb-4">
            Your transfer has been processed successfully
          </p>

          <div className="my-green-box w-full rounded-lg p-4 text-left text-sm ">
            <p className="mb-2 flex justify-between">
              <strong className="gray-text">Amount:</strong>{" "}
              <span className="text-green-400 font-semibold">
                ₹{amount || ""}
              </span>
            </p>
            <p className="mb-2 flex justify-between">
              <strong className="gray-text">To:</strong>{" "}
              <span className="text-white font-semibold small-text">
                {payee.payeeName}
              </span>
            </p>
            <p className="mb-2 flex justify-between">
              <strong className="gray-text">Transaction ID:</strong>{" "}
              <span className="text-white small-text">{transactionId}</span>
            </p>
            <p className="flex justify-between">
              <strong className="gray-text">Time:</strong>{" "}
              <span className="text-white small-text">{date}</span>
            </p>
          </div>

          <div className="flex justify-between w-full mt-5">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#333] text-gray-300 hover:bg-[#444]"
            >
              Close
            </button>
            <button className="px-4 py-2 rounded-lg bg-[#d4b25e]/20 border border-[#d4b25e]/40 text-[#d4b25e] hover:bg-[#d4b25e]/30">
              View Receipt
            </button>
          </div>

          <p className="text-[11px] text-gray-500 mt-4">
            Powered by MW Banking Solutions
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
