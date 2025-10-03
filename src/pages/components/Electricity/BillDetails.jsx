import React, { useState } from "react";
import { Building2, Hash } from "lucide-react";
import ElectricityPayment from "./ElectricityPayment";

const BillDetails = ({ provider }) => {
  const [consumerNumber, setConsumerNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleFetchBill = () => {
    setIsFetching(true);

    // Simulate API call
    setTimeout(() => {
      setIsFetching(false);
      setConfirmed(true); // mark as confirmed
    }, 1000);
  };

  // When bill is confirmed, render the summary
  if (confirmed) {
    return (
      <ElectricityPayment
        provider={provider.name}
        consumerNumber={consumerNumber}
        customerName={customerName}
        billAmount={3097} // Replace with real amount if available from API
      />
    );
  }
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Provider Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-primary/20 p-4 card-bg-br bigcards">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg icon">
            <Building2 className="text-primary" size={15} />
          </div>
          <div>
            <h3 className="font-medium text-foreground">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.state}</p>
          </div>
        </div>
      </div>

      {/* Bill Details Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br bill-details">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-6">
          <h4 className="leading-none flex items-center gap-2">
            <Hash className="text-primary icon" size={20} />
            Enter Bill Details
          </h4>
          <p className="text-muted-foreground">
            Please provide your consumer number and registered name
          </p>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Consumer Number */}
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium"
              htmlFor="consumerNumber"
            >
              Consumer Number
            </label>
            <input
              id="consumerNumber"
              type="text"
              inputMode="numeric" // opens numeric keypad on mobile
              pattern="[0-9]*" // HTML pattern for only numbers
              placeholder="Enter your consumer number"
              className="flex h-9 w-full rounded-md border px-3 text-base bg-input-background profilecard-input"
              value={consumerNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-digits
                setConsumerNumber(value);
              }}
            />
          </div>

          {/* Customer Name */}
          <div className="space-y-2">
            <label
              className="flex items-center gap-2 text-sm font-medium"
              htmlFor="customerName"
            >
              Customer Name
            </label>
            <input
              id="customerName"
              type="text"
              placeholder="Enter name as per electricity bill"
              className="flex h-9 w-full rounded-md border px-3 text-base bg-input-background profilecard-input"
              value={customerName}
              onChange={(e) => {
                // Replace anything that's not a letter or space
                const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                setCustomerName(value);
              }}
            />
          </div>

          {/* Submit */}
          <button
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium w-full h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
            disabled={!consumerNumber || !customerName || isFetching} // disabled until both filled
            onClick={handleFetchBill}
          >
            {isFetching ? "Fetching..." : "Fetch Bill Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
