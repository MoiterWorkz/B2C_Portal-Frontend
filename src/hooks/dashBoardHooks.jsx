import React, { useState, useEffect } from "react";
import { fetchDashboard } from "../services/service";
import { useSignInStore } from "../store/useSigninStore";

export const DashBoardHooks = () => {
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();
  const [dashBoardData, setDashBoardData] = useState(null);
  //   const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchDashboard(customerId);
        console.log("Fetched data:", data);
        setDashBoardData(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      }
    };
    loadData();
  }, [customerId]);

  return {
    dashBoardData,
  };
};
export default DashBoardHooks;
