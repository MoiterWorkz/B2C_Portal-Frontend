import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithPin } from "../services/service"; // API service
import { ArrowLeft, Phone, LogIn, Shield, Loader2 } from "lucide-react";
import LOGO from "../assets/logo.png";
import { useSignInStore } from "../store/useSigninStore";
import axios from "axios";
import { saveAuthToken } from "../utils/authManager";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setCustomerId } = useSignInStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // extra guard
    setIsLoading(true);

    try {
      const encodedPin = btoa(pin); // encode if backend expects Base64

      // Example: primary auth endpoint to obtain tokens (adjust URL/env as required)
      const authResponse = await axios.post(
        `${
          import.meta.env.VITE_AUTH_API_BASE_URL
        }/api/AuthService/mobile-login`,
        {
          mobileNumber: phone || "9874585225",
          password: pin || "7575",
        }
      );

      // Extract tokens (adjust keys to match backend response)
      const { accessToken, refreshToken } = authResponse.data || {};

      if (accessToken) {
        // Save tokens and enable auto-refresh if your util supports it
        saveAuthToken(accessToken, refreshToken);
      }

      // Call your existing loginWithPin service (keeps original flow)
      const res = await loginWithPin(phone, encodedPin);
      console.info("Login success:", res);

      const customerId = res?.customerId || "";
      setCustomerId(customerId);

      const dataToEncode = JSON.stringify({
        mobileNumber: phone,
        ID: customerId,
      });
      const encodedData = btoa(dataToEncode);

      // Navigate to dashboard with encoded data
      navigate("/dashboard", { state: { encoded: encodedData, encodedPin } });
    } catch (err) {
      // Better logging for debugging
      console.error(
        "Login failed:",
        err?.response?.data ?? err?.message ?? err
      );
      // User-facing error
      alert("Login failed. Check your phone number and PIN and try again.");
    } finally {
      setIsLoading(false);
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
          type="button"
          disabled={isLoading}
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-center mb-1">Welcome Back</h2>
        <p className="text-center medium-text text-neutral-400 mb-6">
          Sign in to your Moiterworkz Banking account
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-busy={isLoading}
        >
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
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </div>

          {/* Info */}
          <p className="small-text pt-[10px] pb-[10px] text-neutral-500 text-center primary-input rounded-[5px]">
            Enter Phone number and 4-digit PIN to sign in
          </p>

          {/* Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 sign-up-button text-black hover:bg-yellow-300 transition ${
              isLoading ? "opacity-70 pointer-events-none" : ""
            }`}
            disabled={isLoading}
            aria-disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Signing in...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Sign In with PIN
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-neutral-400 mt-6">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => navigate("/Sign-Up")}
            className="font-themecolor font-semibold hover:underline"
            type="button"
            disabled={isLoading}
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
