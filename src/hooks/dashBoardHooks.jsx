import React, { useState, useEffect } from "react";
import { fetchDashboard } from "../services/service";
import { useSignInStore } from "../store/useSigninStore";

export const DashBoardHooks = () => {
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();
  const [dashBoardData, setDashBoardData] = useState(null);
  const loadData = async () => {
    const data = await fetchDashboard(customerId);
    setDashBoardData(data);
  };
  useEffect(() => {
    loadData();
  }, [customerId]);

  return {
    dashBoardData,
  };
};
export default DashBoardHooks;
