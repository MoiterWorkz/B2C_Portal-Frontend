import React from "react";
import { CircleCheck, UserPlus, Users, ArrowRight } from "lucide-react";

const PayeeAddedSuccessfully = ({
  formData,
  onAddAnotherPayee,
  onGoToDashboard,
}) => {
  return (
    <div className="rounded-lg border text-card-foreground shadow-sm border-green-500/20  payeeAdd">
      {/* Header Section */}
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-full">
            <CircleCheck className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold leading-none tracking-tight text-green-400">
              Payee Added Successfully!
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {formData.payeeName} has been added to your payee list
            </p>
          </div>
        </div>
      </div>

      {/* Payee Details */}
      <div className="p-6 pt-0 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">
              Payee Name
            </label>
            <p
              className="text-foreground"
              style={{ color: "var(--primary-font-color)" }}
            >
              {formData.payeeName}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">
              Account Number
            </label>
            <p
              className="text-foreground font-mono"
              style={{ color: "var(--primary-font-color)" }}
            >
              {formData.accountNumber}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">Bank</label>
            <p
              className="text-foreground"
              style={{ color: "var(--primary-font-color)" }}
            >
              {formData.bank}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-green-400">Mobile</label>
            <p
              className="text-foreground"
              style={{ color: "var(--primary-font-color)" }}
            >
              {formData.payeeMobile}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 addbutton">
          <button
            onClick={onAddAnotherPayee}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border bg-background hover:bg-primary/10 text-primary border-primary/30 h-9 px-4 py-2 transition-all button1"
          >
            <UserPlus className="h-4 w-4" />
            Add Another Payee
          </button>

          <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 py-2 transition-all button2">
            <Users className="h-4 w-4" />
            View All Payees
          </button>

          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium border bg-background hover:bg-muted text-foreground border-border h-9 px-4 py-2 transition-all button3"
          >
            <ArrowRight className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>

        {/* Info Footer */}
        <div className="flex items-center gap-3 p-4 rounded-lg border InfoFooter">
          <CircleCheck className="h-5 w-5 text-green-400" />
          <div className="flex-1">
            <p
              className="text-sm text-foreground"
              style={{ color: "var(  --primary-font-color)" }}
            >
              <strong>Data Saved:</strong> Your payee information is securely
              stored and will be available even after logout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayeeAddedSuccessfully;
