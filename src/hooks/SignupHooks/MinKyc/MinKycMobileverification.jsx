import React, { useState, useEffect } from "react";
import { Phone, ArrowLeft } from "lucide-react";
import { checkMobileNumber, generateOtp, verifyOtp, resendOtp } from "../../../services/service";

function MinKycMobileVerification({ onBack, onVerified }) {
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [serverOtp, setServerOtp] = useState(""); // store OTP temporarily

  // Auto-clear OTP after 5–8 seconds
  useEffect(() => {
    if (serverOtp) {
      const timer = setTimeout(() => setServerOtp(""), 6000); // ⏱️ 6 seconds
      return () => clearTimeout(timer);
    }
  }, [serverOtp]);

  // 📲 Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!mobile) return alert("Enter mobile number");

    try {
      const res = await checkMobileNumber(mobile);
      if (!res.exists) {
        const otpRes = await generateOtp(mobile);
        setTransactionId(otpRes.transactionId);
        setServerOtp(otpRes.otp); // temporarily store OTP
        setStep("otp");
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error sending OTP");
    }
  };

  // ✅ Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");

    try {
      const res = await verifyOtp(transactionId, otp);
      if (res.success) {
        alert(res.message);
        onVerified?.(mobile); 

        setOtp("")
      } else {
        alert("❌ Incorrect OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Error verifying OTP");
    }
  };

  // 🔁 Resend OTP
  const handleResendOtp = async () => {
    if (!transactionId) return alert("No transaction ID. Please send OTP first.");
    try {
      const res = await resendOtp(transactionId);
      setServerOtp(res.otp); // show again for 6 seconds
    } catch (err) {
      console.error(err);
      alert("Error resending OTP");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black text-white px-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <img src="/logo.png" alt="logo" className="h-10 mb-2" />
        <h1 className="text-2xl font-bold">Moiter Workz</h1>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-lg mb-10">
        <div className="flex justify-between mb-1">
          <span className="text-sm">Mobile Verification</span>
          <span className="text-sm">{step === "mobile" ? "10%" : "30%"}</span>
        </div>
        <div className="w-full bg-neutral-800 rounded-full h-2">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: step === "mobile" ? "10%" : "30%" }}
          />
        </div>
      </div>

      {/* Mobile Number Screen */}
      {step === "mobile" && (
        <div className="bg-neutral-900 rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-neutral-800 p-6 rounded-full">
              <Phone className="text-yellow-500 w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Verify Your Mobile Number</h2>
          <p className="text-neutral-400 mb-8">
            Please enter your mobile number to proceed with KYC verification
          </p>
          <div className="mb-6 text-left">
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <div className="flex items-center bg-black border border-neutral-700 rounded-lg px-3">
              <Phone className="text-neutral-500 w-5 h-5 mr-2" />
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-transparent focus:outline-none py-2 text-white"
              />
            </div>
          </div>
          <button
            onClick={handleSendOtp}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors"
          >
            📲 Send OTP
          </button>
          <button
            onClick={onBack}
            className="mt-6 flex items-center justify-center text-neutral-400 hover:text-yellow-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to KYC Selection
          </button>
        </div>
      )}

      {/* OTP Screen */}
      {step === "otp" && (
        <div className="bg-neutral-900 rounded-2xl shadow-xl p-10 max-w-lg w-full text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-neutral-800 p-6 rounded-full">
              <Phone className="text-yellow-500 w-10 h-10" />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-2">Verify Your Mobile Number</h2>
          <p className="text-neutral-400 mb-8">
            We've sent a 6-digit code to ******{mobile.slice(-4)}
          </p>
          <div className="flex justify-center gap-2 mb-6">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-center w-48 tracking-widest text-lg bg-black border border-neutral-700 rounded-lg py-3 focus:outline-none"
              placeholder="Enter OTP"
            />
          </div>

          {/* Temporary OTP (for demo/testing only) */}
          {serverOtp && (
            <p className="text-yellow-500 mb-6">Demo OTP: {serverOtp}</p>
          )}

          <button
            onClick={handleVerifyOtp}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-colors"
          >
            ✅ Verify & Continue
          </button>

          <button
            onClick={handleResendOtp}
            className="mt-4 text-sm text-blue-400 hover:text-blue-500"
          >
            🔁 Resend OTP
          </button>

          <button
            onClick={() => setStep("mobile")}
            className="mt-6 flex items-center justify-center text-neutral-400 hover:text-yellow-500 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to KYC Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default MinKycMobileVerification;
