import React, { useState, useRef } from "react";
import {
  UserPlus,
  Circle,
  CircleCheck,
  ChevronDown,
  TriangleAlert,
} from "lucide-react";

const AddEditPayee = ({ onSubmit, formData, setFormData }) => {
  const payeeNameRef = useRef();
  const ifscCodeRef = useRef();
  const accountNumberRef = useRef();
  const retypeAccountNumberRef = useRef();
  const payeeMobileRef = useRef();
  const payeeCityRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check fields one by one
    if (!formData.payeeName.trim()) {
      payeeNameRef.current.focus();
      return;
    }

    if (formData.knowIfsc === "yes") {
      if (formData.ifscCode.length !== 11 || formData.ifscCode[4] !== "0") {
        ifscCodeRef.current.focus();
        return;
      }
    }

    if (
      !formData.accountNumber ||
      formData.accountNumber.length < 9 ||
      formData.accountNumber.length > 18
    ) {
      accountNumberRef.current.focus();
      return;
    }

    if (formData.retypeAccountNumber !== formData.accountNumber) {
      retypeAccountNumberRef.current.focus();
      return;
    }

    if (
      !formData.payeeMobile ||
      formData.payeeMobile.length !== 10 ||
      !/^[6-9]/.test(formData.payeeMobile)
    ) {
      payeeMobileRef.current.focus();
      return;
    }

    if (formData.knowIfsc === "no" && !formData.payeeCity.trim()) {
      payeeCityRef.current.focus();
      return;
    }

    // If all validations pass
    console.log("Submitted Data:", formData);
    alert("Payee details submitted successfully!");
    onSubmit(formData);
  };
  const [touched, setTouched] = useState({
    ifscCode: false,
    accountNumber: false,
    retypeAccountNumber: false,
    payeeMobile: false,
  });

  // IFSC validation
  const errors = [];

  if (formData.knowIfsc === "yes" && touched.ifscCode) {
    if (formData.ifscCode.length !== 11)
      errors.push("• IFSC: IFSC code must be exactly 11 characters long");
    else if (formData.ifscCode[4] !== "0")
      errors.push("• IFSC: Fifth character must be 0");
  }

  if (
    touched.accountNumber &&
    (formData.accountNumber.length < 9 || formData.accountNumber.length > 18)
  ) {
    errors.push("• Account: Account number must be between 9 and 18 digits");
  }

  if (
    touched.retypeAccountNumber &&
    formData.retypeAccountNumber !== formData.accountNumber
  ) {
    errors.push("• Retype: Account numbers do not match");
  }

  if (touched.payeeMobile) {
    if (/^[0-5]/.test(formData.payeeMobile))
      errors.push(
        "• Mobile: Enter a valid Indian mobile number starting with 6–9"
      );
    else if (
      /^[6-9]/.test(formData.payeeMobile) &&
      formData.payeeMobile.length < 10
    )
      errors.push("• Mobile: Mobile number must be exactly 10 digits");
  }

  return (
    <div className="Addpay">
      {errors.length > 0 && (
        <div className="p-4 rounded-lg border alert-card card-bg-br mb-4 ">
          <div className="flex items-start gap-3">
            <TriangleAlert className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-yellow-600 font-medium mb-2">
                Input Validation Errors
              </h3>
              <div className="space-y-1 text-sm">
                {errors.map((err, index) => (
                  <p key={index} className="error-red">
                    {err}
                  </p>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Please fix the above errors before proceeding.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border bg-card text-card-foreground shadow-sm card-bg-br"
      >
        <div className="p-6 space-y-6">
          <h3 className="font-semibold text-primary text-lg">
            Enter Payee Details
          </h3>

          {/* Payee Name */}
          <div>
            <label
              htmlFor="payeeName"
              className="text-sm font-medium block mb-1"
            >
              Payee Name
            </label>
            <input
              id="payeeName"
              ref={payeeNameRef}
              type="text"
              value={formData.payeeName}
              onChange={handleChange}
              placeholder="Enter payee full name"
              className="w-full h-9 rounded-md border px-3 py-1 bg-input-background border-border profilecard-input"
            />
          </div>

          {/* Pay Mode */}
          <div>
            <label className="text-sm font-medium block mb-1">Pay Mode</label>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked
                  readOnly
                  className="h-4 w-4 rounded cursor-pointer"
                  style={{ accentColor: "var(--primary-color)" }}
                />
                <label className="text-sm font-medium text-foreground">
                  IMPS (IFSC)
                </label>
              </div>
            </div>
          </div>

          {/* IFSC Radio */}
          <div className="pt-4 border-t border-border space-y-3 border-top">
            <h3 className="text-primary font-medium">
              IMPS (IFSC) - Bank Details
            </h3>
            <label className="text-sm font-medium">
              Do you know payee IFSC Code?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="knowIfsc"
                  value="yes"
                  checked={formData.knowIfsc === "yes"}
                  style={{ accentColor: "var(--primary-color)" }}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      knowIfsc: "yes",
                      isCityValidated: false,
                      payeeCity: "",
                    })
                  }
                />
                <span>Yes</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="knowIfsc"
                  value="no"
                  checked={formData.knowIfsc === "no"}
                  style={{ accentColor: "var(--primary-color)" }}
                  onChange={() =>
                    setFormData({
                      ...formData,
                      knowIfsc: "no",
                    })
                  }
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* City Input & Validation - only if knowIfsc is "no" */}
          {formData.knowIfsc === "no" && (
            <div className="pt-4 border-t border-border space-y-3 border-top">
              <h3 className="text-primary font-medium">Enter City</h3>
              <div className="flex gap-2">
                <input
                  id="payeeCity"
                  type="text"
                  value={formData.payeeCity}
                  onChange={handleChange}
                  placeholder="Enter city name (e.g., Mumbai, Delhi, Bangalore)"
                  className="flex-1 h-9 w-full rounded-md border px-3 py-1 bg-input-background border-border profilecard-input"
                />
                <button
                  type="button"
                  className="bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2 text-sm validate-button"
                  onClick={() => {
                    const isValid = /^[A-Za-z\s]+$/.test(
                      formData.payeeCity.trim()
                    );
                    if (isValid) {
                      setFormData({ ...formData, isCityValidated: true });
                    } else {
                      alert("Please enter a valid city name (letters only).");
                    }
                  }}
                >
                  ✓ Validated
                </button>
              </div>

              {/* Show dropdown only if validation is true */}
              {formData.isCityValidated && (
                <div className="city-dropdown-container mt-4 p-3 bg-muted/30 rounded-lg border border-primary/20 extra-card">
                  <label htmlFor="selectedCity" className="text-sm font-medium">
                    Select City from List
                  </label>

                  <button
                    type="button"
                    className="flex justify-between items-center w-full h-9 mt-2 px-3 py-2 border rounded-md profilecard-input"
                  >
                    <span>Choose your city from the dropdown</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>

                  <p className="text-xs text-muted-foreground mt-2">
                    Please select your city from the available options above
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Payee Bank & Branch Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bank" className="text-sm font-medium block mb-1">
                Payee Bank
              </label>
              <button
                type="button"
                className="flex justify-between items-center w-full h-9 px-3 py-2 border rounded-md profilecard-input"
              >
                <span>Select bank</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="text-sm font-medium block mb-1"
              >
                Payee Branch
              </label>
              <button
                type="button"
                className="flex justify-between items-center w-full h-9 px-3 py-2 border rounded-md profilecard-input"
              >
                <span>Select branch</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </button>
            </div>
          </div>

          {/* IFSC Code Section */}
          {formData.knowIfsc === "yes" && (
            <div>
              <label
                htmlFor="ifscCode"
                className="text-sm font-medium block mb-1"
              >
                IFSC Code
              </label>
              <input
                id="ifscCode"
                ref={ifscCodeRef}
                type="text"
                value={formData.ifscCode}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase(); // uppercase
                  if (value.length <= 11) {
                    setFormData({ ...formData, ifscCode: value });
                    setTouched({ ...touched, ifscCode: true });
                  }
                }}
                onBlur={() => setTouched({ ...touched, ifscCode: true })}
                placeholder="Enter IFSC code (e.g., HDFC0000123)"
                maxLength="11"
                className={`w-full h-9 rounded-md border px-3 py-1 bg-input-background profilecard-input ${
                  formData.ifscCode.length > 0 &&
                  (formData.ifscCode.length !== 11 ||
                    formData.ifscCode[4] !== "0")
                    ? "input-border-error"
                    : formData.ifscCode.length === 11 &&
                      formData.ifscCode[4] === "0"
                    ? "input-border-valid"
                    : "border-border"
                }`}
              />

              {/* Validation messages */}
              {formData.ifscCode.length > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    formData.ifscCode.length !== 11 ||
                    formData.ifscCode[4] !== "0"
                      ? "text-error"
                      : "text-valid"
                  }`}
                >
                  {formData.ifscCode.length !== 11
                    ? "IFSC code must be exactly 11 characters long"
                    : formData.ifscCode[4] !== "0"
                    ? "Fifth character must be 0"
                    : "✅ Valid IFSC code format"}
                </p>
              )}

              <p className="text-xs text-muted-foreground mt-1">
                Format: 4 letters (bank code) + 0 + 6 characters (branch code)
              </p>
            </div>
          )}

          {/* Account Number */}
          <div>
            <label
              htmlFor="accountNumber"
              className="text-sm font-medium block mb-1"
            >
              Payee Account Number
            </label>
            <input
              id="accountNumber"
              ref={accountNumberRef}
              type="text"
              value={formData.accountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // allow only digits
                if (value.length <= 18) {
                  setFormData({ ...formData, accountNumber: value });
                  setTouched({ ...touched, accountNumber: true });
                }
              }}
              placeholder="Enter account number (9-18 digits)"
              className={`w-full h-9 rounded-md border px-3 py-1 bg-input-background profilecard-input ${
                formData.accountNumber.length > 0 &&
                (formData.accountNumber.length < 9 ||
                  formData.accountNumber.length > 18)
                  ? "input-border-error"
                  : formData.accountNumber.length >= 9 &&
                    formData.accountNumber.length <= 18
                  ? "input-border-valid"
                  : "border-border"
              }`}
            />

            {/* Validation message */}
            {formData.accountNumber.length > 0 && (
              <p
                className={`text-xs mt-1 ${
                  formData.accountNumber.length < 9 ||
                  formData.accountNumber.length > 18
                    ? "text-error"
                    : "text-valid"
                }`}
              >
                {formData.accountNumber.length < 9 ||
                formData.accountNumber.length > 18
                  ? "Account number must be atleast 9 digits"
                  : `✅ Valid account number format (9 to 18 digits)`}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Account number must be between 9 to 18 digits
            </p>
          </div>

          {/* Retype Account Number */}
          {/* Retype Account Number */}
          <div>
            <label
              htmlFor="retypeAccountNumber"
              className="text-sm font-medium block mb-1"
            >
              Retype Payee Account Number
            </label>

            <input
              id="retypeAccountNumber"
              ref={retypeAccountNumberRef}
              type="text"
              value={formData.retypeAccountNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // only digits
                setFormData({ ...formData, retypeAccountNumber: value });
                setTouched({ ...touched, retypeAccountNumber: true });
              }}
              placeholder="Re-enter account number"
              className={`w-full h-9 rounded-md border px-3 py-1 bg-input-background profilecard-input ${
                formData.retypeAccountNumber.length > 0 &&
                formData.retypeAccountNumber !== formData.accountNumber
                  ? "input-border-error"
                  : formData.retypeAccountNumber.length > 0 &&
                    formData.retypeAccountNumber === formData.accountNumber
                  ? "input-border-valid"
                  : "border-border"
              }`}
            />

            {/* Validation Message */}
            {formData.retypeAccountNumber.length > 0 && (
              <p
                className={`text-xs mt-1 ${
                  formData.retypeAccountNumber === formData.accountNumber
                    ? "text-valid"
                    : "text-error"
                }`}
              >
                {formData.retypeAccountNumber === formData.accountNumber
                  ? "✅ Account numbers match"
                  : "Account numbers do not match"}
              </p>
            )}
          </div>

          {/* Payee Mobile */}
          <div>
            <label
              htmlFor="payeeMobile"
              className="text-sm font-medium block mb-1"
            >
              Payee Mobile
            </label>

            <input
              id="payeeMobile"
              ref={payeeMobileRef}
              type="tel"
              maxLength="10"
              value={formData.payeeMobile}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // only digits
                if (value.length <= 10) {
                  setFormData({ ...formData, payeeMobile: value });
                  setTouched({ ...touched, payeeMobile: true });
                }
              }}
              placeholder="Enter 10-digit mobile number"
              className={`w-full h-9 rounded-md border px-3 py-1 bg-input-background profilecard-input ${
                formData.payeeMobile.length > 0 &&
                (/^[0-5]/.test(formData.payeeMobile) ||
                  (/^[6-9]/.test(formData.payeeMobile) &&
                    formData.payeeMobile.length < 10))
                  ? "input-border-error"
                  : formData.payeeMobile.length === 10 &&
                    /^[6-9]/.test(formData.payeeMobile)
                  ? "input-border-valid"
                  : "border-border"
              }`}
            />

            {/* Validation message */}
            {formData.payeeMobile.length > 0 && (
              <p
                className={`text-xs mt-1 ${
                  /^[0-5]/.test(formData.payeeMobile) ||
                  (/^[6-9]/.test(formData.payeeMobile) &&
                    formData.payeeMobile.length < 10)
                    ? "text-error"
                    : "text-valid"
                }`}
              >
                {/^[0-5]/.test(formData.payeeMobile)
                  ? "Enter a valid Indian mobile number starting with 6, 7, 8, or 9"
                  : formData.payeeMobile.length < 10
                  ? "Mobile number must be exactly 10 digits"
                  : "✅ Valid Indian mobile number"}
              </p>
            )}
          </div>

          {/* Validation Info */}
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 valid-guid">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <CircleCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-primary font-medium mb-2">
                  Validation Guidelines
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <strong>IFSC Code:</strong> 11 characters (e.g. HDFC0000123)
                  </p>
                  <ul className="ml-4 list-disc text-xs">
                    <li>First 4 letters: Bank code (alphabetic)</li>
                    <li>5th character: Must be 0</li>
                    <li>Last 6 characters: Branch code (alphanumeric)</li>
                  </ul>
                  <p>
                    <strong>Account Number:</strong> 9–18 digits only
                  </p>
                  <p>
                    <strong>Mobile Number:</strong> 10 digits starting with 6–9
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-primary h-9 rounded-md button-submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditPayee;
