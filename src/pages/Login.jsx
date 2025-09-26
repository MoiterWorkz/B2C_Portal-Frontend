import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithPin } from "../services/service"; // API service
import { ArrowLeft, Phone, Lock, LogIn } from "lucide-react";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const encodedPin = btoa(pin); // encode if backend expects Base64
    const res = await loginWithPin(phone, encodedPin);
    console.error("Login success:", res);
    navigate("/dashboard");
  } catch (err) {
    console.error("Login failed:", err.response?.data || err.message);
    alert("Login failed. Check your phone number and PIN.");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <img src="/logo.png" alt="Moiter Workz Logo" className="h-8" />
        <h1 className="text-2xl font-bold text-yellow-400">Moiter Workz</h1>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 shadow-lg border border-neutral-800">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white mb-4"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-neutral-400 mb-6">
          Sign in to your Moiterworkz Banking account
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone Number */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Phone size={18} />
            </span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your phone number"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              maxLength={10}
              required
            />
          </div>

          {/* PIN */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
              <Lock size={18} />
            </span>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter your 4-digit PIN"
              className="w-full pl-10 pr-3 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 tracking-widest text-center"
              maxLength={4}
              required
            />
          </div>

          {/* Info */}
          <p className="text-xs text-neutral-500 text-center">
            Enter any phone number and 4-digit PIN to sign in
          </p>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 bg-yellow-400 text-black hover:bg-yellow-300 transition"
          >
            <LogIn size={18} />
            Sign In with PIN
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-neutral-400 mt-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/create-account")}
            className="text-yellow-400 font-semibold hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
