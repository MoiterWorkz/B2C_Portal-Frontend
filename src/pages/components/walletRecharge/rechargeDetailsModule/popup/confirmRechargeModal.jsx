import { createPortal } from "react-dom";
import { CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { calculatePercentage } from "../../../../../helper";

const ConfirmRechargeModal = ({
  amt,
  paymentMethod,
  confirmModal,
  onClose,
  setProcessingModal,
}) => {
  const details = [
    {
      label: "Recharge Amount",
      value: `₹${Number(amt).toLocaleString("en-IN")}.00`,
    },
    { label: "Payment Method", value: paymentMethod },
    {
      label: "Processing Fee",
      value: `₹${calculatePercentage(Number(amt), 0.5)}.00`,
      valueClass: "text-green-400",
    },
  ];

  const formattedAmount = () => {
    // Convert to numbers
    const amtNumber = parseFloat(details?.[0]?.value.replace(/[^0-9.]/g, ""));
    const feeNumber = parseFloat(details?.[2]?.value.replace(/[^0-9.]/g, ""));

    // Add them
    const finalAmount = amtNumber + feeNumber;

    const formatted = `₹${finalAmount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

    return formatted;
  };
  const formattedFinalAmt = formattedAmount();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Disable background scroll when modal is open
  useEffect(() => {
    confirmModal
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    return () => (document.body.style.overflow = "");
  }, [confirmModal]);

  return createPortal(
    <>
      <div
        className="fixed inset-0 h-full flex justify-center items-center z-50 backdrop-blur-xs"
        onClick={handleOverlayClick}
      >
        <div className="bg-[#292929] rounded-lg p-6 w-full max-w-md text-white relative border inner-card-border mx-3">
          {/* Header */}

          <button
            className="absolute text-sm top-4 right-4 text-white hover:text-gray-400"
            onClick={onClose}
          >
            ✕
          </button>
          <h2 className="text-[var(--primary-color)] font-semibold mb-4 flex items-center gap-2">
            <CircleAlert size="20" /> Confirm Recharge
          </h2>
          {/* Close Button */}
          {/* Transaction Summary */}
          <div className="border inner-card-border bg-[var(--card-settings-bg)] rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">Transaction Summary</h3>
            {details.map((item, index) => (
              <div key={index} className="flex justify-between my-2">
                <span className="subheading2-size">{item.label}:</span>
                <span
                  className={`font-semibold text-sm ${item.valueClass || ""}`}
                >
                  {item.value}
                </span>
              </div>
            ))}
            <hr className="my-2 inner-card-border" />
            <div className="flex justify-between font-semibold">
              <span className="text-sm">Total Amount:</span>
              <span className="text-yellow-400">{formattedFinalAmt}</span>
            </div>
          </div>

          {/* Payment Details */}
          <div className="bg-[#292D34] rounded-lg border border-[#3d4552] p-4 mb-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2 text-[#457BBB]">
              <CircleAlert size="20" />
              Payment Details
            </h4>
            <ul className="space-y-1 subheading1-size ps-6">
              <li>• Payment will be processed securely</li>
              <li>• Amount will be added instantly to your wallet</li>
              <li>• You'll receive SMS & email confirmation</li>
              <li>• Transaction is secured with 256-bit encryption</li>
            </ul>
          </div>

          {/* Warning */}
          <div className="border inner-card-border bg-[var(--card-settings-bg)] rounded-lg text-[var(--primary-color)] p-3 mb-4 text-sm flex items-center gap-2">
            <CircleAlert size="18" /> Please verify all details before
            confirming. This transaction cannot be reversed.
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 text-xs">
            <button
              className="px-4 py-2 rounded text-white hover:text-black cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded bg-[var(--primary-color)] text-black hover:opacity-90 font-semibold cursor-pointer"
              onClick={() => {
                setProcessingModal(true);
                onClose();
              }}
            >
              Confirm & Pay {formattedFinalAmt}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ConfirmRechargeModal;
