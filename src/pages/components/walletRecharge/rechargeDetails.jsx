import { useState } from "react";
import ConfirmRechargeModal from "./rechargeDetailsModule/popup/confirmRechargeModal";
import RechargeProcessingModal from "./rechargeDetailsModule/popup/rechargeProcessingModal";
import QuickRecharge from "./rechargeDetailsModule/quickRecharge";
import CustomAmounts from "./rechargeDetailsModule/customAmounts";
import Buttons from "./rechargeDetailsModule/buttons";
import WalletRechargeHook from "../../../hooks/walletRechargeHook";
import WalletInfo from "./rechargeDetailsModule/walletInfo";
const WalletRecharge = ({
  setIsMethodPayment,
  amount,
  setAmount,
  activePayment,
}) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);
  const { walletDatas } = WalletRechargeHook();

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="rounded-xl card-hover-effect-no-pointer p-6 space-y-5">
      <WalletInfo walletDatas={walletDatas} />
      {/* <PaymentMethod
        activePayment={activePayment}
        setActivePayment={setActivePayment}
      /> */}
      <QuickRecharge setAmount={setAmount} amount={amount} />
      <CustomAmounts handleChange={handleChange} amount={amount} />
      {/* Buttons */}
      <Buttons
        amount={amount}
        setConfirmModal={setConfirmModal}
        setAmount={setAmount}
        setIsMethodPayment={setIsMethodPayment}
      />
      {confirmModal && (
        <ConfirmRechargeModal
          confirmModal={confirmModal}
          onClose={() => setConfirmModal(false)}
          paymentMethod={activePayment}
          setProcessingModal={setProcessingModal}
          amt={amount}
        />
      )}
      {processingModal && (
        <RechargeProcessingModal
          onClose={() => setProcessingModal(false)}
          // handleWalletRecharge={handleWalletRecharge}
        />
      )}
    </div>
  );
};

export default WalletRecharge;
