import React from "react";
import {
  Users,
  UserCheck,
  Building2
} from "lucide-react";
import PayeeDirectory from "./PayeeDirectory";

const PayeeManagement = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-8 space-y-6 ">
      {/* Header */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-hover-effect flex justify-between px-6 py-4 ">
        <div className="flex">
          <div className="flex items-center gap-3 text-xl font-semibold ">
            <div className="p-3 icon-bg rounded-xl full-border">  <Users className="font-themecolor" size={22} /></div>
            <div>
              <div className="flex flex-row items-center gap-2">
                <h1 className="form-heading2 text-white"> Payee Management</h1>
                <span className="icon-bg font-themecolor text-xs px-2 py-0.5 rounded-md">
                  MW
                </span>
              </div>
              <p className="small-text gray-text mt-1">
                Manage your trusted payees securely
              </p>
            </div>


          </div>

        </div>
        <div className="flex flex-col  items-center gap-1">
          <div className="flex items-center gap-2 my-gold-box font-themecolor px-3 py-2 rounded-xl">
            <UserCheck className="font-themecolor" size={18} />
            <span className="small-text font-medium ">Kavin A</span>
          </div>
          <p className="small-text gray-text ">demo@moiterworkz.com</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Payees */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-hover-effect p-5 flex justify-between items-center transition">
          <div>
            <p className="small-text  gray-text mb-1">Total Payees</p>
            <h2 className="text-3xl font-bold font-themecolor">4</h2>
            <p className="small-text  font-themecolor mt-1">Active Accounts</p>
          </div>
          <div className="p-3 icon-bg rounded-xl">
            <Users className="font-themecolor" size={28} />
          </div>
        </div>

        {/* IMPS (IFSC) */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm card-hover-effect p-5 flex justify-between items-center  transition">
          <div>
            <p className="small-text  gray-text mb-1">IMPS (IFSC)</p>
            <h2 className="text-3xl font-bold font-themecolor">4</h2>
            <p className="small-text font-themecolor mt-1">Bank Transfers</p>
          </div>
          <div className="p-3 icon-bg rounded-xl">
            <Building2 className="font-themecolor" size={28} />
          </div>
        </div>
      </div>
      <PayeeDirectory />

      <div className="w-full flex  justify-center">
        <p className="  px-3 py-2 rounded-md  small-text my-gold-box font-themecolor ">Powered by MW Banking Solutions</p>
      </div>
    </div>
  );
};

export default PayeeManagement;
