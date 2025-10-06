import React, { useState } from "react";
import {
  CircleCheckBig,
  CreditCard,
  Shield,
  Zap,
  Calendar,
  X,
} from "lucide-react";

const PaymentSuccessDialog = ({
  isOpen,
  onClose,
  amount,
  provider,
  accountNo = "••••••4567",
  transactionId = "TXN1234567890",
  dateTime = new Date().toLocaleString(),
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 bg-card border-2 border-primary/30 shadow-2xl backdrop-blur-sm">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-xs opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <X size={20} />
        <span className="sr-only">Close</span>
      </button>

      <div className="text-center space-y-6 p-4">
        <div className="flex justify-center">
          <CircleCheckBig className="h-20 w-20 text-green-500 drop-shadow-lg" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl text-green-400 mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground text-sm">
            Your payment has been processed successfully
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-4">
          <div className="text-center border-b border-primary/20 pb-3">
            <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
            <p className="text-3xl text-primary">{amount}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service</span>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-400" />
                <span className="text-foreground">Electricity Bill</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Provider</span>
              <span className="text-foreground font-medium">{provider}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Account No.</span>
              <span className="text-foreground font-mono text-xs">
                {accountNo}
              </span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-primary/10">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="text-primary font-mono text-xs">
                {transactionId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Date & Time
              </span>
              <span className="text-foreground text-xs">{dateTime}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <span className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-md text-xs font-medium">
            <CreditCard className="h-4 w-4" />
            MW Banking - Secure Payment
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          This popup will close automatically in a few seconds
        </p>
      </div>
    </div>
  );
};

const ElectricityPayment = ({
  provider,
  consumerNumber,
  customerName,
  billAmount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 2000); // 2 seconds simulation
  };

  const handleCloseDialog = () => {
    setIsPaid(false);
  };

  return (
    <div className="space-y-6">
      {/* Bill Details Confirmed */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border card-bg-br bill-details-confirm-card1">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-6">
          <h4 className="leading-none flex items-center gap-2 ">
            <CircleCheckBig className="icon" size={20} />
            Bill Details Confirmed
          </h4>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Provider</p>
              <p className="innerpara">{provider}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Consumer Number</p>
              <p className="innerpara">{consumerNumber}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customer Name</p>
              <p className="innerpara">{customerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bill Amount</p>
              <p className="amount-para">₹{billAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Card */}
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl card-bg-br bill-details-confirm-card2">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 pb-6">
          <h4 className="leading-none flex items-center gap-2 text-primary">
            <CreditCard className="icon" size={20} />
            Payment
          </h4>
          <p className="text-muted-foreground">
            Confirm your payment to process the electricity bill
          </p>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg border card">
            <div className="flex items-center justify-between">
              <span className="text-foreground span1">Total Amount</span>
              <span className="span2">₹{billAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing || isPaid}
            className="inline-flex items-center justify-center gap-2 w-full h-10 px-6 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isProcessing
              ? "Processing..."
              : isPaid
              ? "Payment Successful"
              : `Pay ₹${billAmount.toLocaleString()}`}
          </button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center action">
            <Shield size={15} />
            <span>Secured by MW Banking</span>
          </div>
        </div>
      </div>

      {/* Payment Success Dialog */}
      <PaymentSuccessDialog
        isOpen={isPaid}
        onClose={handleCloseDialog}
        amount={`₹${billAmount.toLocaleString()}`}
        provider={provider}
      />
    </div>
  );
};

export default ElectricityPayment;
