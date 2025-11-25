import React, { useState } from "react";
import PayeeHeader from "./PayeeHeader";
import AddEditPayee from "./addEditPayee";
import VerifyPayeeDetails from "./VerifyPayeeDetails";
import PayeeAddedSuccessfully from "./PayeeAddedSuccessfully";
import { addpayee } from "../../../services/service";
import { useSignInStore } from "../../../store/useSigninStore";

const PayeeContainer = () => {
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();
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
    bank: "", // ✅ added
    branch: "", // ✅ added
  });
  const handleAddEditSubmit = (data) => {
    setPayeeData(data);
    setActiveStep("verify");
  };

  const handleBackToEdit = () => {
    setActiveStep("addEdit");
  };

  const handleConfirmAddPayee = async () => {
    const payload = {
      customerId: customerId,
      payeeName: formData.payeeName,
      payMode: formData.payMode, 
      ifscCode: formData.ifscCode,
      payeeBank: formData.bank,
      payeeBranch: formData.branch,
      payeeAccountNumber: formData.accountNumber,
      payeeMobile: formData.payeeMobile,
      payeeCity: formData.payeeCity,
      createdBy: "string",
    };

    try {
      const response = await addpayee(payload);
      console.log("Payee Added Response:", response);
      setActiveStep("success");
    } catch (error) {
      console.error("Error adding payee:", error);
    }
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
      bank: "", // ✅ reset bank
      branch: "",
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
