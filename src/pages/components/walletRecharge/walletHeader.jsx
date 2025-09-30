import { Wallet } from "lucide-react";

const WalletHeader = () => {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <Wallet size="28" color="var(--primary-color)" />
      </div>
      <div>
        <p className="second-normal-heading">Wallet Recharge</p>
        <p className="subheading2-size">
          Add money to your digital wallet instantly
        </p>
      </div>
    </div>
  );
};

export default WalletHeader;
