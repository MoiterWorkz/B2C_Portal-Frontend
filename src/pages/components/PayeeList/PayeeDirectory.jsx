import React, { useEffect, useState } from "react";
import {
  User,
  Banknote,
  Phone,
  Clock,
  Trash2,
  Send,
  Plus,
  Building2,
  Shield,
  CreditCard,
} from "lucide-react";
import TransferModal from "./TransferModal";
import SuccessModal from "./SuccessModal";
import { useZustandStore } from "../../../store/useSignInStore";
import { useNavigate } from "react-router";

const PayeeDirectory = () => {
  const { payeeList, fetchPayeeList } = useZustandStore();
  const [selectedPayee, setSelectedPayee] = useState(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transferAmount, setTransferAmount] = useState("");
  const navigate = useNavigate();
  const openTransferModal = (payee) => {
    setSelectedPayee(payee);
    setShowTransferModal(true);
  };

  const closeTransferModal = () => {
    setShowTransferModal(false);
  };

  const handleTransferSuccess = (amount) => {
    setTransferAmount(amount); // save entered amount
    setShowTransferModal(false); // close transfer modal
    setShowSuccessModal(true); // open success modal
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  useEffect(() => {
    fetchPayeeList();
  }, []);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm full-border rounded-t-2xl">
      {/* Header */}
      <div className="flex justify-between items-center   px-6 py-4 shadow-lg">
        <h2 className="flex items-center gap-2 text-lg font-semibold font-themecolor">
          <CreditCard size={18} className="font-themecolor" />
          Payee Directory
        </h2>
        <button
          className="flex items-center gap-2 sign-up-button  transition px-4 py-2 rounded-xl text-sm font-medium"
          onClick={() => navigate("/fund-transfer/add-payee")}
        >
          <Plus size={16} className="text-black" />
          Add Payee
        </button>
      </div>

      {/* Table */}
      {payeeList.length === 0 && (
        <p className="text-center text-red-500">No data Available</p>
      )}
      {payeeList.length > 0 && (
        <div className="w-full overflow-x-auto rounded-t-2xl full-border">
          <table className="w-full min-w-[900px] text-sm border-collapse">
            <thead className="font-themecolor small-text uppercase ">
              <tr>
                {[
                  "Payee Information",
                  "Banking Details",
                  "Account Number",
                  "Contact",
                  "Transfer Mode",
                  "Date Added",
                  "Actions",
                ].map((title) => (
                  <th
                    key={title}
                    className="text-left py-3 px-4 full-border align-middle whitespace-nowrap"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {payeeList?.map((p, i) => {
                const [date, time] = p.createdAt.split("\n");
                const firstLetter = p.payeeName.charAt(0);

                return (
                  <tr
                    key={i}
                    className="full-border hover:bg-[#232323] transition"
                  >
                    {/* Payee Info */}
                    <td className="py-4 px-4 full-border align-top whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full font-semibold font-themecolor icon-bg full-border">
                          {firstLetter}
                        </div>
                        <p className="font-medium text-gray-200">
                          {p.payeeName}
                        </p>
                      </div>
                    </td>

                    {/* Bank Details */}
                    <td className="py-4 px-4 full-border align-top">
                      <p className="font-medium text-gray-100 flex items-center gap-1 whitespace-nowrap">
                        <Building2 size={14} className="font-themecolor" />
                        {p.payeeBank}
                      </p>
                      <p className="small-text gray-text">{p.payeeBranch}</p>
                      <span className="inline-block mt-1 small-text my-blue-box rounded-md px-2 py-0.5">
                        {p.ifscCode}
                      </span>
                    </td>

                    {/* Account Number */}
                    <td className="py-4 px-4 full-border align-top">
                      <div className="icon-bg full-border rounded-md px-3 py-1 text-white small-text whitespace-nowrap">
                        {p.payeeAccountNumber}
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-4 full-border align-top whitespace-nowrap">
                      <div className="flex items-center gap-2 text-white">
                        <Phone size={14} className="font-themecolor" />
                        +91 {p.payeeMobile}
                      </div>
                    </td>

                    {/* Transfer Mode */}
                    <td className="py-4 px-4 full-border align-top whitespace-nowrap">
                      <span className="small-text my-blue-box rounded-md px-3 py-1 inline-block">
                        {p.payMode}
                      </span>
                    </td>

                    {/* Date Added */}
                    <td className="py-4 px-4 full-border align-top whitespace-nowrap">
                      <p className="gray-text flex items-center gap-1">
                        <Clock size={13} className="font-themecolor" />
                        Registered
                      </p>
                      <p className="font-semibold text-gray-200">{date}</p>
                      <p className="small-text text-gray-500">{time}</p>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 full-border align-top whitespace-nowrap">
                      <button
                        onClick={() => openTransferModal(p)}
                        className="flex items-center gap-1 px-3 py-1 my-gold-box font-themecolor small-text rounded-lg transition"
                      >
                        <Send size={14} /> Transfer
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {/* Modals */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={closeTransferModal}
        payee={selectedPayee}
        onSuccess={handleTransferSuccess}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        payee={selectedPayee}
        amount={transferAmount}
      />
    </div>
  );
};

export default PayeeDirectory;
