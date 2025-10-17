import React, { useState } from "react";
import { X, Send, UserCheck } from "lucide-react";

const TransferModal = ({ isOpen, onClose, payee, onSuccess }) => {

    const [amount, setAmount] = useState("");

    if (!isOpen || !payee) return null;

    const handleTransfer = () => {
        if (!amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        // simulate success (replace with API call later)
        setTimeout(() => {
            onSuccess(amount);
        }, 800);
    };
    return (
        <>
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-card text-card-foreground rounded-xl w-[450px] p-6 shadow-lg relative">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-[#d4b25e] flex items-center gap-2">
                            Transfer Money
                        </h2>
                        <button onClick={onClose}>
                            <X size={20} className="gray-text hover:text-white" />
                        </button>
                    </div>

                    {/* Payee Info */}
                    <div>

                        <div className="full-border flex flex-col gap-3  rounded-lg p-4 mb-4 small-text text-white ">
                            <div className="flex gap-2"><UserCheck className="font-themecolor" size={18} /> <strong className="medium-text">Transfer To</strong></div>
                            <p><strong>Name:</strong> {payee.name}</p>
                            <p><strong>Bank:</strong> {payee.bank}</p>
                            <p><strong>Account:</strong> {payee.account}</p>
                            <p ><strong>Mode:</strong> {payee.mode}</p>
                        </div>
                    </div>


                    {/* Amount Input */}
                    <div className="mb-3">
                        <label className="block text-white small-text mb-1">Transfer Amount (₹)</label>
                        <input
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full border full-border rounded-lg px-3 py-1 small-text text-white"
                            placeholder="Enter amount"
                        />
                    </div>

                    {/* Remarks */}
                    <div className="mb-4">
                        <label className="block text-white small-text mb-1">Remarks (Optional)</label>
                        <textarea
                            rows={2}
                            className="w-full border full-border rounded-lg px-3 py-1 small-text text-white"
                            placeholder="Enter transfer purpose or message"
                        ></textarea>
                    </div>

                    <div className=" my-gold-box font-themecolor small-text px-3 py-1 mb-3">
                        Please verify all details before confirming. This transaction cannot be reversed.
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-[#333] gray-text hover:bg-[#444]"
                        >
                            Cancel
                        </button>
                        <button className="px-4 py-2 rounded-lg my-gold-box flex items-center gap-1"
                            onClick={handleTransfer}>
                            <Send size={14} /> Transfer ₹{amount || 0}
                        </button>
                    </div>
                </div>
            </div>

        </>

    );
};

export default TransferModal;
