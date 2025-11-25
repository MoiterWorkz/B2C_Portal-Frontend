import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useIdleTimeout from "../utils/useIdleTimeout";
import { useSignInStore } from "../store/useSigninStore";

const PrivateRoute = ({ children }) => {
  const { getCustomerId, logout } = useSignInStore();
  const customerId = getCustomerId();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);

  // ⚙️ Use idle timeout hook: logout after 20s idle, show warning after 10s
  useIdleTimeout(
    () => {
      setShowWarning(false);
      logout(); // clear session/token
      navigate("/Customer-Login", { replace: true });
    },
    300000,
    () => setShowWarning(true)
  ); // 20s total, show warning at 10s

  // Close warning popup when user becomes active
  useEffect(() => {
    const resetWarning = () => setShowWarning(false);
    window.addEventListener("mousemove", resetWarning);
    window.addEventListener("keydown", resetWarning);
    return () => {
      window.removeEventListener("mousemove", resetWarning);
      window.removeEventListener("keydown", resetWarning);
    };
  }, []);

  if (!customerId) {
    return <Navigate to="/Customer-Login" replace />;
  }

  return (
    <>
      {children}
      {showWarning && (
        <div className="fixed bottom-4 right-4 bg-yellow-600 text-white p-3 rounded shadow-lg">
          ⚠️ You will be logged out soon due to inactivity!
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
