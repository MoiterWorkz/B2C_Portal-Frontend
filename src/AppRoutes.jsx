import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/Landingpage";
import SignUpPage from "./pages/signup";
import SetPin from "./hooks/SignupHooks/MinKyc/SetPin";
import Login from "./pages/Login";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import WalletRecharge from "./pages/walletRecharge";
import ManageWallet from "./pages/manageWallet";
import MyCard from "./pages/myCard";
import BillRecharges from "./pages/billRecharges";
import TransactionHistory from "./pages/transactionHistory";
import FundTransferLayout from "./pages/fundTransfer/fundTransferLayout";
import AddPayee from "./pages/fundTransfer/addPayee";
import PayeeList from "./pages/fundTransfer/payeeList";
// import MakersDashboard from "./pages/makersDashboard";

function AppRoutes({ setRole }) {
  return (
    <Routes>
      {/* Default route → directly show LandingPage */}
      <Route path="/" element={<Navigate to="/MW-B2C" />} />

      {/* Optional: if someone types /LandingPage in URL */}
      <Route path="/MW-B2C" element={<LandingPage />} />
      <Route path="/set-pin" element={<SetPin />} />
      <Route path="/Customer-Login" element={<Login />} />
      {/* If you want to redirect unknown paths to LandingPage */}

      <Route path="/Sign-Up" element={<SignUpPage />} />
      <Route element={<Layout />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="manage-wallet" element={<ManageWallet />} />
        <Route path="my-card" element={<MyCard />} />
        <Route path="bill-recharges" element={<BillRecharges />} />
        <Route path="transaction-history" element={<TransactionHistory />} />
        <Route path="wallet-recharge" element={<WalletRecharge />} />
        <Route path="fund-transfer" element={<FundTransferLayout />}>
          <Route path="add-payee" element={<AddPayee />} />
          <Route path="payee-list" element={<PayeeList />} />
        </Route>
        <Route />
      </Route>
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
export default AppRoutes;
