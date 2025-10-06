import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmRechargeModal from "./rechargeDetailsModule/popup/confirmRechargeModal";
import RechargeProcessingModal from "./rechargeDetailsModule/popup/rechargeProcessingModal";
import { capitalizeFirst, generateTransactionRef } from "../../../helper/index";
import { useSignInStore } from "../../../store/useSigninStore";
import {
  debitWallet,
  moveTransaction,
  rechargeWallet,
} from "../../../services/service";
import PaymentMethod from "./rechargeDetailsModule/paymentMethod";
import QuickRecharge from "./rechargeDetailsModule/quickRecharge";
import CustomAmounts from "./rechargeDetailsModule/customAmounts";
import Buttons from "./rechargeDetailsModule/buttons";
import WalletInfo from "./rechargeDetailsModule/walletInfo";
const WalletRecharge = () => {
  const [amount, setAmount] = useState("");
  const [activePayment, setActivePayment] = useState("UPI");
  const [confirmModal, setConfirmModal] = useState(false);
  const [processingModal, setProcessingModalModal] = useState(false);
  const [logId] = useState(() => uuidv4());
  const [transactionRef] = useState(() => generateTransactionRef());
  const { getCustomerId } = useSignInStore();
  const customerId = getCustomerId();

  const handleChange = (e) => {
    const value = e.target.value.replace(/,/g, ""); // Remove commas
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleWalletRecharge = async () => {
    const customerId = 2000003;
    const channelId = "web";
    const basePayload = {
      customerId,
      logId,
      amount,
      channelId,
      referenceNumber: transactionRef,
    };

    try {
      // Step 1: Recharge Wallet
      const res = await rechargeWallet(basePayload);

      // Step 2: Move Transaction
      await moveTransaction({
        trackerId: res?.tracker_id,
        apiStatus: res?.status,
      });

      // Step 3: Debit Wallet
      const debitRes = await debitWallet(basePayload);
      const firstLetterCap = capitalizeFirst(debitRes?.status);

      alert(`Wallet recharge completed ${firstLetterCap}fully! 🎉`);
    } catch (error) {
      // Show a generic failure message
      alert("An error occurred. Please try again later.");
    } finally {
      setTimeout(() => {
        setAmount("");
        setActivePayment("");
      }, 1000);
    }
  };

  return (
    <div className="text-card-foreground rounded-xl border card-hover-effect-no-pointer p-6 space-y-5">
      <WalletInfo />
      <PaymentMethod
        activePayment={activePayment}
        setActivePayment={setActivePayment}
      />
      <QuickRecharge setAmount={setAmount} amount={amount} />
      <CustomAmounts handleChange={handleChange} amount={amount} />
      {/* Buttons */}
      <Buttons
        amount={amount}
        setConfirmModal={setConfirmModal}
        setAmount={setAmount}
      />
      {confirmModal && (
        <ConfirmRechargeModal
          amount={amount}
          confirmModal={confirmModal}
          onClose={() => setConfirmModal(false)}
          paymentMethod={activePayment}
          setProcessingModalModal={setProcessingModalModal}
          amt={amount}
        />
      )}
      {processingModal && (
        <RechargeProcessingModal
          onClose={() => setProcessingModalModal(false)}
          handleWalletRecharge={handleWalletRecharge}
        />
      )}
    </div>
  );
};

export default WalletRecharge;
