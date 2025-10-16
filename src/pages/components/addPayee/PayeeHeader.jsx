import React from "react";
import { UserPlus, Circle } from "lucide-react";

const PayeeHeader = ({ step }) => {
  return (
    <div className="px-6 lg:px-8 py-6 lg:py-8 space-y-3 Addpay">
      {/* Header */}
      <div className="flex items-center gap-3 Addpay">
        <UserPlus className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-foreground text-xl font-semibold">
            Add / Edit Payee
          </h1>
          <p className="text-muted-foreground">
            Add a new payee for quick transfers
          </p>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-hover-effect Addpay">
        <div className="p-4 flex items-center gap-4 ">
          {/* Step 1 - Enter Details */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg enterdetailsbutton enterdetailsbutton ${
              step === "addEdit" ? "active" : ""
            }`}
          >
            <Circle
              className="h-4 w-4 fill-current"
              style={{ color: "var(--text)" }}
            />
            <span>Enter Details</span>
          </div>

          <div
            className="h-0.5 flex-1"
            style={{
              backgroundColor:
                step === "addEdit" ? "GREY" : "var(--primary-color)",
            }}
          ></div>

          {/* Step 2 - Verify Details */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg verifydetailsbutton ${
              step === "verify" ? "bg-primary text-white" : "bg-muted"
            }`}
          >
            <Circle className="h-4 w-4 " />
            <span>Verify Details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayeeHeader;
