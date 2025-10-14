import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccountPin } from "../../../services/service";
import LOGO from "../../../assets/logo.png";
import {
  CircleCheck,
  CircleCheckBig,
  Eye,
  EyeClosed,
  EyeOff,
  Lock,
  Shield,
} from "lucide-react";

const SetPin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const data = location
  const mobileNumber = location?.state?.mobileNumber;
  const customerID = location?.state?.customerId
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  // Validation functions
  const isFourDigits = /^\d{4}$/.test(pin);
  const onlyNumbers = /^\d*$/.test(pin);

  const isSequential = (pin) => {
    if (pin.length < 4) return false;
    const digits = pin.split("").map(Number);
    return (
      digits.every((d, i) => i === 0 || d === digits[i - 1] + 1) || // ascending
      digits.every((d, i) => i === 0 || d === digits[i - 1] - 1) // descending
    );
  };

  const isRepeating = (pin) => /^(\d)\1+$/.test(pin);

  const validations = {
    "Must be exactly 4 digits": isFourDigits,
    "Only numbers allowed": onlyNumbers,
    "No sequential numbers (e.g., 1234)": !isSequential(pin),
    "No repeating numbers (e.g., 1111)": !isRepeating(pin),
  };

  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async () => {
    try {
      const encodedPin = btoa(pin); // 🔒 encode
      const customerIdValue = parseInt(customerID); // make sure it's a number
      await setAccountPin(customerIdValue, mobileNumber, encodedPin);

      // console.log("CustomerID:", customerIdValue, "Mobile:", mobileNumber, "PIN:", encodedPin);
      alert("Account created successfully. You may login now with your registered mobile number and PIN.");
      navigate("/Customer-Login");
    } catch (err) {
      
      console.error("Error setting PIN:", err);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center  bg-primary-background  w-full">
      {/* Logo + Progress */}
      <div className="flex flex-col items-center mb-5 w-full">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />
        </div>
        <div className=" w-1/2 flex justify-between">
          <p className=" font-themecolor medium-text ">Set Account Pin</p>
          <p className="icon-color small-text">90%</p>
        </div>
        <div className="w-1/2 bg-gray-800 h-2 rounded-full mt-2">
          <div
            className="sign-up-button h-2 rounded-full"
            style={{ width: "90%" }}
          ></div>
        </div>
      </div>
      {/* card */}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-2xl px-6 py-6 card-hover-effect mt-4">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="icon-bg  p-3 rounded-[50px]">
            <Shield className="font-themecolor" size={32} />
          </div>
        </div>

        <h2 className="form-heading2 font-semibold text-center mb-2 white-letter-color">
          Set Account PIN
        </h2>
        <div className="text-center small-text gray-text mb-6">
          <div>Create a secure 4-digit PIN for your account</div>
          <div className="text-center small-text gray-text mt-3">
            Setting up PIN for{" "}
            <span className="font-themecolor font-semibold">
              {mobileNumber}
            </span>
          </div>
        </div>
        <label className="small-text font-medium white-letter-color">
          Enter 4-digit PIN
        </label>
        {/* Input */}
        <div className="relative mb-4">
          <input
            type={showPin ? "text" : "password"}
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter your PIN"
            className="w-full full-border pl-[10px] pr-[8px] py-[8px] rounded-[10px] bg-neutral-800 border small-text border-neutral-700 focus:outline-none focus:ring-1 focus:ring-yellow-200 white-letter-color"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          >
            {showPin ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <label className="small-text font-medium white-letter-color">
          PIN Requirements:
        </label>
        {/* Validations */}
        <div className="space-y-1 mb-6 text-sm">
          {Object.entries(validations).map(([rule, passed]) => (
            <p
              key={rule}
              className={`flex  small-text items-center gap-2 ${
                passed ? "text-green-400" : "text-neutral-400"
              }`}
            >
              <span>
                {passed ? (
                  <CircleCheckBig size={12} />
                ) : (
                  <CircleCheckBig size={12} />
                )}
              </span>
              {rule}
            </p>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!allValid}
          className={`w-full py-2 rounded-lg font-semibold transition ${
            allValid
              ? "sign-up-button text-black hover:bg-yellow-300"
              : "bg-neutral-700 text-neutral-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {/* Footer note */}
        <p className="small-text px-5 py-2 gray-text text-center  rounded-[5px] mt-5 full-border flex items-center">
          <span className="font-themecolor">
            <Lock size={14} />
          </span>
          Your PIN is encrypted and securely stored. Never share your PIN with
          anyone.
        </p>
      </div>
    </div>
  );
};

export default SetPin;
