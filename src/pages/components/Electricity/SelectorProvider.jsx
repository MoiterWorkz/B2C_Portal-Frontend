import React, { useState } from "react";
import { ArrowLeft, Zap, Check } from "lucide-react";
import Providers from "./Providers";
import BillDetails from "./BillDetails";
import ElectricityPayment from "./ElectricityPayment";

const SelectorProvider = () => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [billDetails, setBillDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Handle back button
  const handleBack = () => {
    if (billDetails) {
      setBillDetails(null); // Back to BillDetails
    } else if (selectedProvider) {
      setSelectedProvider(null); // Back to Providers
    }
  };

  // Handle bill confirmation from BillDetails component
  const handleBillConfirm = (details) => {
    setBillDetails(details);
  };

  // Handle payment success
  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);

    setTimeout(() => {
      setPaymentSuccess(false);
      setBillDetails(null);
      setSelectedProvider(null); // Go back to Providers automatically
    }, 2500); // popup duration
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col w-full gap-4">
        {/* Back button always top-left */}
        {(selectedProvider || billDetails) && (
          <div className="self-start">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border backbutton"
            >
              <ArrowLeft size={15} /> Back
            </button>
          </div>
        )}

        {/* Icon + Text */}
        <div className="flex  sm:flex-row items-center sm:items-start gap-3 w-full">
          {/* Big Icon */}
          <div className="p-3 rounded-xl border Big-icon flex-shrink-0">
            <Zap size={20} className="text-yellow-400" />
          </div>

          {/* Title + Badge + Description */}
          <div className="group-3 flex-1">
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h1 className="text-lg font-semibold">
                Electricity Bill Payment
              </h1>
              <span
                className="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground"
                data-slot="badge"
              >
                MW Banking
              </span>
            </div>
            <p className="text-muted-foreground text-sm text-left">
              Select your electricity provider
            </p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex flex-col sm:flex-row items-center gap-6 w-full circle-number">
        {/* Step 1 */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center circle text-xs">
            {selectedProvider || billDetails || paymentSuccess ? (
              <Check className="text-green-500 w-4 h-4" />
            ) : (
              "1"
            )}
          </div>
          <span
            className={`text-sm ${
              selectedProvider || billDetails || paymentSuccess
                ? "text-green-500"
                : "text-primary"
            }`}
          >
            Select Provider
          </span>
        </div>

        {/* Divider */}
        <div
          className="bg-border sm:flex-1 sm:h-px sm:w-auto w-px h-6"
          style={{
            // color: "var:(--primary-color)",
            border: "var(--thin-border)",
          }}
        ></div>

        {/* Step 2 */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center circle text-xs">
            {billDetails || paymentSuccess ? (
              <Check className="text-green-500 w-4 h-4" />
            ) : (
              "2"
            )}
          </div>
          <span
            className={`text-sm ${
              billDetails || paymentSuccess
                ? "text-green-500"
                : "text-muted-foreground"
            }`}
          >
            Bill Details
          </span>
        </div>

        {/* Divider */}
        <div
          className="bg-border sm:flex-1 sm:h-px sm:w-auto w-px h-6"
          style={{
            // color: "var:(--primary-color)",
            border: "var(--thin-border)",
          }}
        ></div>

        {/* Step 3 */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center circle text-xs">
            {paymentSuccess ? (
              <Check className="text-green-500 w-4 h-4" />
            ) : (
              "3"
            )}
          </div>
          <span
            className={`text-sm ${
              paymentSuccess ? "text-green-500" : "text-muted-foreground"
            }`}
          >
            Payment
          </span>
        </div>
      </div>

      {/* Render Components */}
      {!selectedProvider ? (
        <Providers onSelect={(provider) => setSelectedProvider(provider)} />
      ) : !billDetails ? (
        <BillDetails
          provider={selectedProvider}
          onConfirm={handleBillConfirm}
        />
      ) : (
        <ElectricityPayment
          {...billDetails}
          provider={selectedProvider.name}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Payment Success Popup */}
      {paymentSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg w-full max-w-sm mx-auto">
            <h2 className="text-lg font-semibold text-green-600">
              Payment Successful!
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Redirecting to Providers...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectorProvider;
