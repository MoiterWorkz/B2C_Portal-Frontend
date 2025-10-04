import React, { useState } from "react";
import { ArrowLeft, Zap, Building2, Search } from "lucide-react";
import Providers from "./Providers";
import BillDetails from "./BillDetails";

// const providersData = [
//   {
//     id: 1,
//     name: "Tamil Nadu Electricity Board (TNEB)",
//     description: "Official electricity board of Tamil Nadu",
//     code: "TNEB",
//     state: "Tamil Nadu",
//   },
//   {
//     id: 2,
//     name: "Kerala State Electricity Board (KSEB)",
//     description: "Kerala state power distribution",
//     code: "KSEB",
//     state: "Kerala",
//   },
//   {
//     id: 3,
//     name: "Maharashtra State Electricity Distribution Co. Ltd.",
//     description: "Maharashtra electricity distribution",
//     code: "MSEDCL",
//     state: "Maharashtra",
//   },
//   {
//     id: 4,
//     name: "Bangalore Electricity Supply Company",
//     description: "Bangalore city electricity supply",
//     code: "BESCOM",
//     state: "Karnataka",
//   },
//   {
//     id: 5,
//     name: "Andhra Pradesh Central Power Distribution Company",
//     description: "Central AP power distribution",
//     code: "APCPDCL",
//     state: "Andhra Pradesh",
//   },
//   {
//     id: 6,
//     name: "Telangana State Southern Power Distribution",
//     description: "South Telangana power distribution",
//     code: "TSSPDCL",
//     state: "Telangana",
//   },
//   {
//     id: 7,
//     name: "West Bengal State Electricity Distribution",
//     description: "West Bengal electricity board",
//     code: "WBSEDCL",
//     state: "West Bengal",
//   },
//   {
//     id: 8,
//     name: "Bihar State Power Holding Company Ltd.",
//     description: "Bihar state electricity board",
//     code: "BSPHCL",
//     state: "Bihar",
//   },
//   {
//     id: 9,
//     name: "Uttar Pradesh Power Corporation Ltd.",
//     description: "UP state electricity corporation",
//     code: "UPCL",
//     state: "Uttar Pradesh",
//   },
//   {
//     id: 10,
//     name: "Rajasthan Rajya Vidyut Prasaran Nigam",
//     description: "Rajasthan power transmission",
//     code: "RRVPNL",
//     state: "Rajasthan",
//   },
// ];

const SelectorProvider = () => {
   const [selectedProvider, setSelectedProvider] = useState(null);
  // const [search, setSearch] = useState("");

  // const filteredProviders = providersData.filter(
  //   (p) =>
  //     p.name.toLowerCase().includes(search.toLowerCase()) ||
  //     p.state.toLowerCase().includes(search.toLowerCase()) ||
  //     p.code.toLowerCase().includes(search.toLowerCase())
  // );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border backbutton">
          <ArrowLeft size={15} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl border Big-icon">
            <Zap size={20} className="text-yellow-400" />
          </div>
          <div className="group-3">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-lg font-semibold">
                Electricity Bill Payment
              </h1>
              <span
                className="px-3 py-1 text-xs font-medium rounded-md bg-primary text-primary-foreground"
                data-slot="badge"
              >
                MW Banking
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Select your electricity provider
            </p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 circle-number">
        <div className="flex items-center gap-2 text-primary">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center circle">
            1
          </div>
          <span className="text-sm ">Select Provider</span>
        </div>
        <div className="flex-1 h-px bg-border"></div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-muted-foreground circle">
            2
          </div>
          <span className="text-sm ">Bill Details</span>
        </div>
        <div className="flex-1 h-px bg-border"></div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-muted-foreground circle">
            3
          </div>
          <span className="text-sm ">Payment</span>
        </div>
      </div>

      {/* render the componet here  */}
       {!selectedProvider ? (
        <Providers onSelect={(provider) => setSelectedProvider(provider)} />
      ) : (
        <BillDetails provider={selectedProvider} />
      )}
    </div>
  );
};

export default SelectorProvider;
