import React, { useState, useEffect } from "react";
import { Phone, ArrowLeft, Smartphone, CircleCheck, RefreshCw } from "lucide-react";
import { checkMobileNumber, generateOtp, verifyOtp, resendOtp } from "../../../services/service";
import LOGO from "../../../assets/logo.png"

function FullKycMobileVerification({ onBack, onVerified }) {
  
  console.log(onVerified)
  const [mobile, setMobile] = useState("");
  const [step, setStep] = useState("mobile");
  const [otp, setOtp] = useState("");
  const [transactionId, setTransactionId] = useState(null);
  const [serverOtp, setServerOtp] = useState(""); // store OTP temporarily

  // Auto-clear OTP after 5–8 seconds
  useEffect(() => {
    if (serverOtp) {
      const timer = setTimeout(() => setServerOtp(""), 9000); // ⏱️ 6 seconds
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
    <div className="  items-center justify-center bg-primary-background text-white px-4">
      {/* Logo + Progress */}
      <div className="flex flex-col items-center mb-5">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />

        </div>
        <div className=" w-1/2 flex justify-between">
          <p className=" gray-text medium-text">Mobile Verification</p>
          <p className="icon-color small-text">30%</p>
        </div>
        <div className="w-1/2 bg-gray-800 h-2 rounded-full mt-2">

          <div
            className="sign-up-button h-2 rounded-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>

      {/* Mobile Number Screen */}
      {step === "mobile" && (
        <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
                w-full sm:w-[600px] lg:w-[800px] xl:w-[1000px] 
                transform transition-transform duration-300 hover:scale-105 mx-auto ">
          <div className="flex items-center justify-center mb-6">
            <div className="icon-bg  p-6 rounded-[55px]">
              <Phone className="font-themecolor" size={35} />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3">Verify Your Mobile Number</h2>
          <p className="gray-text mb-8 medium-text">
            Please enter your mobile number to proceed with KYC verification
          </p>
          <div className="flex flex-col items-center justify-center">
            <div className="w-3/4">
              <div className="mb-6 text-left">
                <label className="small-text font-medium">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                    <Phone size={18} />
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-10 pr-[8px] py-[8px] rounded-[20px] bg-neutral-800 border small-text border-neutral-700 focus:outline-none focus:ring-1 focus:ring-yellow-200"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleSendOtp}
              className="w-3/4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 sign-up-button  text-black hover:bg-yellow-300 transition"
            >
              <Smartphone size={18} /> Send OTP
            </button>
          </div>
          <div className=" w-full flex justify-center items-center  ">
            <button
              onClick={onBack}
              className=" flex justify-center items-center  gap-5 gray-text small-text mt-6 mb-6 button-hoverbg px-3 py-2 rounded-[8px]"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to KYC Selection
            </button>
          </div>
        </div>
      )}

      {/* OTP Screen */}
      {step === "otp" && (
        <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
                w-full sm:w-[600px] lg:w-[800px] xl:w-[1000px] 
                transform transition-transform duration-300 hover:scale-105 mx-auto">
          <div className="flex items-center justify-center mb-6">
            <div className="icon-bg  p-6 rounded-[55px]">
              <Phone className="font-themecolor" size={35} />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-3">Verify Your Mobile Number</h2>
          {/* Temporary OTP (for demo/testing only) */}
          {serverOtp && (
            <p className="gray-text mb-8 medium-text">Demo OTP: {serverOtp}</p>
          )}
          <p className="gray-text mb-8 medium-text">
            We've sent a 6-digit code to ******{mobile.slice(-4)}
          </p>
          <div className="flex justify-center gap-2 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={otp[index] || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // only digits
                  const newOtp = otp.split("");
                  newOtp[index] = value;
                  setOtp(newOtp.join(""));

                  // Auto focus next
                  if (value && e.target.nextSibling) {
                    e.target.nextSibling.focus();
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
                    // Move focus back
                    e.target.previousSibling.focus();

                    // Also clear previous box
                    const newOtp = otp.split("");
                    newOtp[index - 1] = "";
                    setOtp(newOtp.join(""));
                  }
                }}
                className="w-12 h-12 text-center small-text font-bold  focus:ring-2 full-border rounded-md  "
              />
            ))}
          </div>

          <div className="flex items-center justify-center">

            <button
              onClick={handleVerifyOtp}
              className="w-3/4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 sign-up-button  text-black hover:bg-yellow-300 transition"
            >
              <CircleCheck className="w-5 h-5 mr-1" /> Verify & Continue
            </button>
          </div>
          <div className=" w-full flex justify-center items-center">
            <button
              onClick={handleResendOtp}
              className="flex justify-center items-center gap-2 gray-text small-text mb-6 button-hoverbg px-2 py-1 rounded-[10px] mt-2"
            >
              <RefreshCw className="w-3 h-3 mr-1" /> Resend OTP
            </button>
          </div>
          <button
            onClick={() => setStep("mobile")}
            className="mt-6 flex items-center gap-2 gray-text small-text  button-hoverbg px-2 py-1 rounded-[10px]"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to KYC Selection
          </button>
        </div>
      )}
    </div>
  );
}

export default FullKycMobileVerification;
