import RechargeDetails from "./components/walletRecharge/rechargeDetails";
import WalletHeader from "./components/walletRecharge/walletHeader";
const WalletRecharge = () => {
  return (
    <div className="space-y-5">
      <WalletHeader />
      <RechargeDetails />
    </div>
  );
};

export default WalletRecharge;
