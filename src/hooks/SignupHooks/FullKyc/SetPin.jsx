import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccountPin } from "../../../services/service";

const SetPin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mobileNumber = location.state?.mobileNumber;
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
      digits.every((d, i) => i === 0 || d === digits[i - 1] - 1)    // descending
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
      await setAccountPin(mobileNumber, encodedPin);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error setting PIN:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-800">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-neutral-800 rounded-full flex items-center justify-center">
            <span className="text-yellow-400 text-2xl">🔒</span>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2 text-white">Set Account PIN</h2>
        <p className="text-center text-neutral-400 mb-6">
          Create a secure 4-digit PIN for your account<br />
          Setting up PIN for{" "}
          <span className="text-yellow-400 font-semibold">{mobileNumber}</span>
        </p>

        {/* Input */}
        <div className="relative mb-4">
          <input
            type={showPin ? "text" : "password"}
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter your PIN"
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-center text-lg tracking-widest"
          />
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
          >
            {showPin ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Validations */}
        <div className="space-y-1 mb-6 text-sm">
          {Object.entries(validations).map(([rule, passed]) => (
            <p key={rule} className={`flex items-center gap-2 ${passed ? "text-green-400" : "text-neutral-400"}`}>
              <span>{passed ? "✔" : "○"}</span>
              {rule}
            </p>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={!allValid}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            allValid
              ? "bg-yellow-400 text-black hover:bg-yellow-300"
              : "bg-neutral-700 text-neutral-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {/* Footer note */}
        <p className="text-xs text-neutral-500 mt-4 text-center flex items-center justify-center gap-2">
          <span>🔒</span>
          Your PIN is encrypted and securely stored. Never share your PIN with anyone.
        </p>
      </div>
    </div>
  );
};

export default SetPin;
