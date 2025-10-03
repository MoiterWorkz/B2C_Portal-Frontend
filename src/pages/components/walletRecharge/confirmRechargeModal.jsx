import { CircleAlert } from "lucide-react";

const ConfirmRechargeModal = ({
  amt,
  paymentMethod,
  processingFee = "FREE",
  isOpen,
  onClose,
  onConfirm,
}) => {
  const details = [
    {
      label: "Recharge Amount",
      value: `₹${Number(amt).toLocaleString("en-IN")}.00`,
    },
    { label: "Payment Method", value: paymentMethod },
    {
      label: "Processing Fee",
      value: processingFee,
      valueClass: "text-green-400",
    },
  ];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-full flex justify-center items-center z-50">
      <div className="bg-[var(--third-backgroundcolor)] rounded-lg p-6 w-full max-w-md text-white relative border border-[var(--third-backgroundcolor)]">
        {/* Header */}

        <button
          className="absolute text-sm top-4 right-4 text-gray-400 hover:text-white"
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
            <span className="text-yellow-400">
              ₹{Number(amt).toLocaleString("en-IN")}.00
            </span>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-[#292D34] rounded p-4 mb-4">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <CircleAlert size="20" />
            Payment Details
          </h4>
          <ul className="text-sm space-y-1">
            <li>• Payment will be processed securely</li>
            <li>• Amount will be added instantly to your wallet</li>
            <li>• You'll receive SMS & email confirmation</li>
            <li>• Transaction is secured with 256-bit encryption</li>
          </ul>
        </div>

        {/* Warning */}
        <div className="bg-yellow-900 text-yellow-200 p-3 rounded mb-4 text-sm">
          ⚠ Please verify all details before confirming. This transaction cannot
          be reversed.
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-yellow-400 text-black hover:opacity-90 font-semibold"
            onClick={onConfirm}
          >
            Confirm & Pay ₹{amt.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRechargeModal;
