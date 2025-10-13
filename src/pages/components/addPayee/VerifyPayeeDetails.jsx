import React from "react";

const VerifyPayeeDetails = ({ payeeData, onBack, onConfirm, formData }) => {
  // Example: fallback if payeeData is missing
  const showCitySection =
    formData.knowIfsc === "no" && formData.payeeCity?.trim() !== "";

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-hover-effect Verify-Payee-Details">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold leading-none tracking-tight text-primary">
          Verify Payee Details
        </h3>
      </div>

      {/* Details */}
      <div className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Detail label="Payee Name" value={formData.payeeName} />
          <Detail label="Pay Mode" value={formData.payMode} />
          <Detail label="Bank" value={formData.bank} />
          <Detail label="Branch" value={formData.branch} />
          {/* <Detail label="IFSC Code" value={formData.ifscCode} /> */}
          <Detail label="Account Number" value={formData.accountNumber} />
          <Detail label="Mobile Number" value={formData.payeeMobile} />
          {showCitySection && (
            <>
              <Detail label="Entered City" value={formData.payeeCity} />
              <Detail
                label="City Validation"
                value={
                  formData.isCityValidated
                    ? "✅ City validated successfully"
                    : "❌ City not validated"
                }
              />
            </>
          )}
        </div>

        {/* Divider */}
        <div
          role="separator"
          className="bg-border h-px w-full my-6 border-top"
        ></div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm  flex-1 h-9 px-4 py-2 border-border back-to-edit"
          >
            Back to Edit
          </button>

          <button
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm flex-1 h-9 px-4 py-2 confirm-to-pay"
          >
            Confirm & Add Payee
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Small helper subcomponent for cleaner markup
const Detail = ({ label, value }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-muted-foreground">{label}</label>
    <p className="text-foreground break-words">{value || "-"}</p>
  </div>
);

export default VerifyPayeeDetails;
