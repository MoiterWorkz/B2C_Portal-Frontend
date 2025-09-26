import { react, useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import Cards from "./components/dashboard/Cards";
import Charts from "./components/dashboard/Charts";

const Dashboard = () => {
  const [hideBalance, setHideBalance] = useState(false);
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          <DashboardHeader
            hideBalance={hideBalance}
            setHideBalance={setHideBalance}
          />
          <Cards hideBalance={hideBalance} />
          <Charts />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
