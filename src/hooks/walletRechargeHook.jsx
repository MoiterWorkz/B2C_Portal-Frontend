import { useEffect, useState } from "react";
import { fetchWalletBalance } from "../services/service";
import { useSignInStore } from "../store/useSigninStore";
const WalletRechargeHook = () => {
  const [walletDatas, setWalletDatas] = useState();
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();
  const getWalletBalance = async () => {
    const data = await fetchWalletBalance(2000069);
    setWalletDatas(data);
  };

  useEffect(() => {
    walletDatas?.message && alert("Failed to Load Wallet Recharge Datas");
  }, []);
  useEffect(() => {
    getWalletBalance();
  }, []);
  return { walletDatas, getWalletBalance };
};

export default WalletRechargeHook;
