import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import SignUpPage from "./pages/signup";
import SetPin from "./hooks/SignupHooks/MinKyc/SetPin";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
// import MakersDashboard from "./pages/makersDashboard";

function AppRoutes({ setRole }) {
  return (
    <Routes>
      {/* Default route → directly show LandingPage */}
      <Route path="/" element={<LandingPage />} />

      {/* Optional: if someone types /LandingPage in URL */}
      <Route path="/LandingPage" element={<LandingPage />} />
      <Route path="/set-pin" element={<SetPin />} />
      <Route path="/Customer-Login" element={<Login />} />
      {/* If you want to redirect unknown paths to LandingPage */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/Sign-Up" element={<SignUpPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
export default AppRoutes;
