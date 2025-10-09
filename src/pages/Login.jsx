import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithPin } from "../services/service"; // API service
import { ArrowLeft, Phone, LogIn, Shield } from "lucide-react";
import LOGO from "../assets/logo.png";
import { useSignInStore } from "../store/useSigninStore";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const { setCustomerId } = useSignInStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const encodedPin = btoa(pin); // encode if backend expects Base64
      const res = await loginWithPin(phone, encodedPin);
      console.error("Login success:", res);
      setCustomerId(res?.customerId);
      const customerId = res?.customerId || "";
      const dataToEncode = JSON.stringify({ mobileNumber: phone, ID: customerId });

      // Encode the JSON as Base64
      const encodedData = btoa(dataToEncode);
      navigate("/dashboard", { state: { encoded: encodedData,encodedPin  } });
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Check your phone number and PIN.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-background text-white px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />
      </div>

      {/* Card */}
      <div className="w-full max-w-md small-cards rounded-2xl p-6 shadow-lg card-hover-effect">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 small-text text-neutral-400 hover:text-white mb-4"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-1">Welcome Back</h2>
        <p className="text-center medium-text text-neutral-400 mb-6">
          Sign in to your Moiterworkz Banking account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}

          <label className="small-text font-medium">Phone number</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Phone size={18} />
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-[8px] py-[8px] rounded-[20px] bg-neutral-800 border small-text border-neutral-700 focus:outline-none focus:ring-1 focus:ring-yellow-200 full-border"
              maxLength={10}
              required
            />
          </div>

          {/* PIN */}
          <label className="small-text font-medium">4-Digit PIN</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Shield size={18} />
            </span>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your 4-digit PIN"
              className="w-full pl-10 pr-[8px] py-[8px] rounded-[20px] bg-neutral-800 border small-text border-neutral-700 focus:outline-none focus:ring-1 focus:ring-yellow-200 full-border"
              maxLength={4}
              required
            />
          </div>

          {/* Info */}
          <p className="small-text pt-[10px] pb-[10px] text-neutral-500 text-center primary-input rounded-[5px]">
            Enter Phone number and 4-digit PIN to sign in
          </p>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 sign-up-button  text-black hover:bg-yellow-300 transition"
          >
            <LogIn size={18} />
            Sign In with PIN
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-neutral-400 mt-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/Sign-Up")}
            className="font-themecolor font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
