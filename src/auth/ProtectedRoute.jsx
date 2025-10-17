// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useIdleTimeout from "../utils/useIdleTimeout"; // ✅ correct import

const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const navigate = useNavigate();
  const userType = Number(localStorage.getItem("userType"));
  const isAuthenticated = !!localStorage.getItem("username");

  const handleLogout = () => {
    console.log("🚪 Logging out due to inactivity...");
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    navigate("/MW-B2C/home", { replace: true });
  };

  // Call hook
  const { showWarning, countdown } = useIdleTimeout(handleLogout, 300000, 270000);

  if (!isAuthenticated) return <Navigate to="/Customer-Login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(userType)) return <Navigate to="/Customer-Login" replace />;

  return (
    <>
      {children}
      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center w-[300px]">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">⚠️ Inactivity Warning</h2>
            <p className="text-gray-600 mb-3">
              You’ll be logged out in{" "}
              <span className="font-bold text-red-600">{countdown}</span> seconds.
            </p>
            <p className="text-sm text-gray-500">Move your mouse or press any key to stay logged in.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedRoute;
