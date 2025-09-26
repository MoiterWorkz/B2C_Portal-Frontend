import React, { useState } from "react";
import { FileText, Shield, ArrowLeft, Lock } from "lucide-react";
import MinKycMobileVerification from "./MinKyc/MinKycMobileverification";
import Index from "./MinKyc";

// Example components for next step
const MinKYCForm = ({pan}) => (
    <div className="w-full p-6 text-white"><Index pan={pan}/></div>
);

const FullKYCForm = () => (
    <div className="p-6 text-white">🔐 Full KYC Form goes here</div>
);

const KYCScreen = ({pan}) => {
    const [selected, setSelected] = useState(null);

    return (
        <div className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center px-6 py-10">
            {/* Back button */}
            <div className="w-full max-w-6xl">
                <button
                    className="flex items-center gap-2 text-gray-400 text-sm hover:text-white mb-6"
                    onClick={() => setSelected(null)} // reset selection
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </button>

                {/* If no selection -> show KYC choice */}
                {!selected && (
                    <>
                        {/* Logo + Progress */}
                        <div className="flex flex-col items-center mb-12">
                            <h1 className="text-2xl font-bold flex items-center gap-2">
                                <span className="text-yellow-500 text-3xl">〽</span> Moiter Workz
                            </h1>
                            <div className="w-1/2 bg-gray-800 h-2 rounded-full mt-4">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: "15%" }}
                                ></div>
                            </div>
                            <p className="text-xs mt-1 text-gray-400">Select KYC Type</p>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-bold">Choose Your KYC Type</h2>
                            <p className="text-gray-400 text-sm mt-1">
                                Select the verification method that suits you best
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Min KYC */}
                            <div
                                onClick={() => setSelected("min")}
                                className="cursor-pointer bg-[#1a1a1a] border border-yellow-900/40 rounded-xl p-6 shadow-lg hover:shadow-yellow-500/30 hover:border-yellow-500 transition"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-[#2b2b2b] p-3 rounded-lg">
                                        <FileText className="text-yellow-500" size={28} />
                                    </div>
                                    <h3 className="text-xl font-semibold">Min KYC</h3>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    Quick verification with basic details. Perfect for getting
                                    started fast with instant account activation and basic banking
                                    features.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <span className="inline-block border border-gray-700 px-3 py-1 rounded-md text-sm">
                                        Basic ID Verification
                                    </span>
                                    <span className="inline-block border border-gray-700 px-3 py-1 rounded-md text-sm">
                                        ₹10,000 Monthly Limit
                                    </span>
                                </div>
                                <p className="text-sm text-orange-400 font-semibold flex items-center gap-1">
                                    ⚡ Fast approval in 2-3 minutes
                                </p>
                                <p className="text-xs text-gray-400">
                                    Mobile recharge, bill payments, basic transfers
                                </p>
                            </div>

                            {/* Full KYC */}
                            <div
                                onClick={() => setSelected("full")}
                                className="cursor-pointer bg-[#1a1a1a] border border-yellow-900/40 rounded-xl p-6 shadow-lg hover:shadow-yellow-500/30 hover:border-yellow-500 transition"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-[#2b2b2b] p-3 rounded-lg">
                                        <Shield className="text-yellow-500" size={28} />
                                    </div>
                                    <h3 className="text-xl font-semibold">Full KYC</h3>
                                </div>
                                <p className="text-gray-300 mb-6">
                                    Complete verification with multiple options. Unlock all
                                    features and higher limits for unlimited banking experience.
                                </p>
                                <div className="space-y-3 mb-6">
                                    <span className="inline-block border border-gray-700 px-3 py-1 rounded-md text-sm">
                                        Complete Verification
                                    </span>
                                    <span className="inline-block border border-gray-700 px-3 py-1 rounded-md text-sm">
                                        Unlimited Transactions
                                    </span>
                                </div>
                                <p className="text-sm text-yellow-500 font-semibold flex items-center gap-1">
                                    <Lock size={14} /> Maximum security & full access
                                </p>
                                <p className="text-xs text-gray-400">
                                    All banking features, high-value transfers, investment options
                                </p>
                            </div>
                        </div>
                    </>
                )}


            </div>
            {/* If selected -> show form */}
            {selected === "min" && <MinKYCForm pan={pan}/>}
            {selected === "full" && <FullKYCForm />}
        </div>
    );
};

export default KYCScreen;
