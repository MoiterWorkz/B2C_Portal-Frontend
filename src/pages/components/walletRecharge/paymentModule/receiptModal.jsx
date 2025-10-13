import { useEffect, useRef } from "react";
import { CircleCheckBig, Wallet, Shield, History } from "lucide-react";
import { ruppeeWithComma } from "../../../../helper";
import { useNavigate } from "react-router";

const ReceiptModal = ({ onClose, amount, isProcessingClosed }) => {
  const navigate = useNavigate();

  const transactionDetails = [
    {
      label: "Transaction ID:",
      value: "WR1768013871771",
      valueClass: "text-white",
    },
    {
      label: "Payment Method:",
      value: "Net Banking",
      valueClass: "text-white",
    },
    {
      label: "Date & Time:",
      value: "9 Oct 2025 at 06:01 pm",
      valueClass: "text-white",
    },
    {
      label: "Status:",
      value: (
        <div className="flex items-center gap-1">
          <CircleCheckBig size="12" />
          <span>Completed</span>
        </div>
      ),
      valueClass: "text-green-500",
    },
    { label: "Processing Fee:", value: "FREE", valueClass: "text-green-500" },
  ];

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    isProcessingClosed
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => (document.body.style.overflow = "");
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#2a2a2af2] receipt-boxshadow border border-thin text-white shadow-lg rounded-xl w-full max-w-md p-6 relative">
        <h1 className="text-[var(--primary-color)] font-semibold text-[16px] mb-2 flex items-center gap-2">
          <CircleCheckBig className="text-green-400" size="20" />
          Wallet Recharge Receipt
        </h1>

        <div className="flex flex-col items-center mb-4">
          <div className="bg-[var(--success-icon-bg)] rounded-full p-3 mb-2">
            <CircleCheckBig className="text-green-400" size="28" />
          </div>
          <h2 className="text-green-400 font-semibold text-lg">
            Payment Successful!
          </h2>
          <p className="text-xs text-gray-400 mb-3">
            Your wallet has been recharged successfully
          </p>
          <div className="p-3 rounded-xl w-full text-center border-thin bg-[var(--dark-primarybackground-color)]">
            <p className="text-gray-400 text-xs mb-[2px]">Amount Credited</p>
            <h1 className="font-bold text-[var(--primary-color)] text-[22px] md:text-[26px]">{`+₹${ruppeeWithComma(
              amount
            )}.00`}</h1>
          </div>
        </div>

        <p className="text-white font-semibold text-sm mb-4">
          Transaction Details
        </p>
        <div className="text-sm space-y-3 mb-4">
          {transactionDetails.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span className="text-[#a0a0a0] text-xs">{item.label}</span>
              <span className={`${item.valueClass} text-xs font-semibold`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-[var(--wallet-updated-bg)] border blue-border rounded-lg p-3 mb-4">
          <div className="flex items-start gap-2">
            <Wallet size="24" className="text-blue-400 " />
            <div>
              <p className="font-semibold text-blue-400 text-sm">
                Wallet Updated
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Your wallet balance has been updated instantly. You can now use
                this amount for payments and transactions.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Current Balance:{" "}
                <span className="text-[var(--primary-color)] font-bold text-md">
                  ₹1,850
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-yellow-400 border-thin bg-[var(--dark-primarybackground-color)] rounded-lg mb-4 flex items-center gap-2 p-3">
          <Shield size="18" />
          <p className="text-xs">
            Keep this receipt for your records. SMS and email confirmation will
            be sent shortly.
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#1a1a1a] border border-[#fad48933] hover:bg-[#404040] hover:text-black rounded-xl text-sm"
          >
            Close Receipt
          </button>
          <button
            className="submit-btn flex items-center gap-2"
            onClick={() => {
              onClose();
              navigate("/transaction-history");
            }}
          >
            <History size="16" />
            View in History
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
