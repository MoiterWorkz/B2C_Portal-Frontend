import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AutoRechargeSettings from "./components/walletRecharge/autoRechargeSettings";
import PaymentMethod from "./components/walletRecharge/paymentMethod";
import RechargeDetails from "./components/walletRecharge/rechargeDetails";
import RechargeHistory from "./components/walletRecharge/rechargeHistory";
import WalletHeader from "./components/walletRecharge/walletHeader";
import { useSignInStore } from "../store/useSignInStore";
import { rechargeWallet, moveTransaction } from "../services/service";
import { generateTransactionRef } from "../helper";
import WalletRechargeHook from "../hooks/walletRechargeHook";
const WalletRecharge = () => {
  const [isPaymentMethod, setIsMethodPayment] = useState(false);
  const [isApiErrorCaught, setIsApiErrorCaught] = useState();
  const [amount, setAmount] = useState("");
  const [logId] = useState(() => uuidv4());
  const { getCustomerId } = useSignInStore();
  const [transactionRef] = useState(() => generateTransactionRef());
  const [activePayment, setActivePayment] = useState("UPI");
  const { getWalletBalance } = WalletRechargeHook();
  const customerId = getCustomerId();

  const handleWalletRecharge = async () => {
    const channelId = "web";
    const basePayload = {
      customerId,
      logId,
      amount,
      channelId,
    };

    try {
      // Step 1: Recharge Wallet
      const res = await rechargeWallet(basePayload);
      if (res?.status === "FAILED") {
        const alertMsg = res?.message.split(":").slice(2).join(":").trim();
        alert(alertMsg);
        setIsApiErrorCaught(true);
        return;
      }

      // Step 2: Move Transaction
      await moveTransaction({
        trackerId: res?.tracker_id,
        apiStatus: res?.status,
        referenceNumber: transactionRef,
      });
      setIsApiErrorCaught(false);
      // alert(`Wallet recharge completed Successfully! 🎉`);
    } catch (error) {
      // Show a generic failure message
      setIsApiErrorCaught(true);
      alert("An error occurred. Please try again later.");
    } finally {
      getWalletBalance();
      setTimeout(() => {
        setIsMethodPayment(false);
        setAmount("");
        setActivePayment("");
      }, 1000);
    }
  };
  return (
    <div className="space-y-5">
      {!isPaymentMethod && (
        <>
          <WalletHeader />
          <RechargeDetails
            activePayment={activePayment}
            setAmount={setAmount}
            amount={amount}
            setIsMethodPayment={setIsMethodPayment}
          />
          <RechargeHistory />
          <AutoRechargeSettings />
        </>
      )}
      {isPaymentMethod && (
        <PaymentMethod
          setIsMethodPayment={setIsMethodPayment}
          amount={amount}
          handleWalletRecharge={handleWalletRecharge}
          isApiErrorCaught={isApiErrorCaught}
        />
      )}
    </div>
  );
};

export default WalletRecharge;
