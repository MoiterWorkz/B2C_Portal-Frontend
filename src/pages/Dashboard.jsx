import { react, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import Cards from "./components/dashboard/Cards";
import Charts from "./components/dashboard/Charts";
import QuickAction from "./components/dashboard/QuickAction";
import BillAndTransaction from "./components/dashboard/BillAndTransaction";
import { fetchDashboard } from "../services/service";
import { useSignInStore } from "../store/useSigninStore";
// import { fetchDashboard } from "../../../services/service";
// import { useSignInStore } from "../../../store/useSigninStore";
import DashBoardHooks from "../hooks/dashBoardHooks";

const Dashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);

  const { dashBoardData } = DashBoardHooks();

  if (!dashBoardData) {
    return <p style={{ color: "var(--primary-color)" }}>Loading...</p>;
  }
  return (
    <div className="space-y-6">
      <DashboardHeader
        hideBalance={hideBalance}
        setHideBalance={setHideBalance}
        dashBoardData={dashBoardData}
      />
      <Cards hideBalance={hideBalance} dashBoardData={dashBoardData} />
      <Charts dashBoardData={dashBoardData} />
      <QuickAction dashBoardData={dashBoardData} />
      <BillAndTransaction dashBoardData={dashBoardData} />
    </div>
  );
};

export default Dashboard;
