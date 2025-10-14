import React, { useState } from "react";
import PayeeHeader from "./PayeeHeader";
import AddEditPayee from "./addEditPayee";
import VerifyPayeeDetails from "./VerifyPayeeDetails";
import PayeeAddedSuccessfully from "./PayeeAddedSuccessfully";

const PayeeContainer = () => {
  const [activeStep, setActiveStep] = useState("addEdit"); // 'addEdit' | 'verify' | 'success'
  const [payeeData, setPayeeData] = useState(null);
  const [formData, setFormData] = useState({
    payeeName: "",
    ifscCode: "",
    accountNumber: "",
    retypeAccountNumber: "",
    payeeMobile: "",
    payMode: "IMPS",
    knowIfsc: "yes",
    payeeCity: "",
    mobileNumber: "",
    isCityValidated: false,
  });
  const handleAddEditSubmit = (data) => {
    setPayeeData(data);
    setActiveStep("verify");
  };

  const handleBackToEdit = () => {
    setActiveStep("addEdit");
  };

  const handleConfirmAddPayee = () => {
    setActiveStep("success");
  };
  const handleAddAnotherPayee = () => {
    setFormData({
      payeeName: "",
      ifscCode: "",
      accountNumber: "",
      retypeAccountNumber: "",
      payeeMobile: "",
      payMode: "IMPS",
      knowIfsc: "yes",
      payeeCity: "",
      mobileNumber: "",
      isCityValidated: false,
    });
    setActiveStep("addEdit");
  };
  const handleGoToDashboard = () => {
    window.location.href = "/dashboard"; // navigate to dashboard page
  };
  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="">
        <PayeeHeader step={activeStep} />
      </div>

      {/* Dynamic Content */}
      <div className="mx-auto p-6">
        {activeStep === "addEdit" && (
          <AddEditPayee
            onSubmit={handleAddEditSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {activeStep === "verify" && (
          <VerifyPayeeDetails
            payeeData={payeeData}
            onBack={handleBackToEdit}
            onConfirm={handleConfirmAddPayee}
            formData={formData}
          />
        )}
        {activeStep === "success" && (
          <PayeeAddedSuccessfully
            formData={formData}
            onAddAnotherPayee={handleAddAnotherPayee}
            onGoToDashboard={handleGoToDashboard}
          />
        )}
      </div>
    </div>
  );
};

export default PayeeContainer;
