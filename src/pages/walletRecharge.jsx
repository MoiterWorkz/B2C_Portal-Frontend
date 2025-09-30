import AutoRechargeSettings from "./components/walletRecharge/autoRechargeSettings";
import RechargeDetails from "./components/walletRecharge/rechargeDetails";
import RechargeHistory from "./components/walletRecharge/rechargeHistory";
import WalletHeader from "./components/walletRecharge/walletHeader";
const WalletRecharge = () => {
  return (
    <div className="space-y-5">
      <WalletHeader />
      <RechargeDetails />
      <RechargeHistory />
      <AutoRechargeSettings />
    </div>
  );
};

export default WalletRecharge;
