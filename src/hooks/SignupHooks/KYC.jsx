import React, { useState } from "react";
import { FileText, Shield, ArrowLeft, Lock } from "lucide-react";
import MinKyc from "./MinKyc";
import FullKyc from "./FullKyc/index";
import LOGO from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

// Example components for next step
const MinKYCForm = ({ pan }) => (
    <div className="w-full p-6 text-white"><MinKyc pan={pan} /></div>
);

const FullKYCForm = ({pan}) => (
    <div className="p-6 text-white"><FullKyc pan={pan}/></div>
);

const KYCScreen = ({ pan }) => {
    const [selected, setSelected] = useState(null);

  const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full bg-primary-background text-white flex flex-col items-center px-6 py-10">
            {/* Back button */}
            <div className="w-full max-w-6xl">


                {/* If no selection -> show KYC choice */}
                {!selected && (
                    <>
                        {/* Logo + Progress */}
                        <div className="flex flex-col items-center mb-5">
                            {/* Logo */}
                            <div className="flex items-center gap-2 mb-6">
                                <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />

                            </div>
                            <div className=" w-1/2 flex justify-between">
                                <p className=" gray-text medium-text">Select KYC Type</p>
                                <p className="icon-color small-text">15%</p>
                            </div>
                            <div className="w-1/2 bg-gray-800 h-2 rounded-full mt-2">

                                <div
                                    className="sign-up-button h-2 rounded-full"
                                    style={{ width: "15%" }}
                                ></div>
                            </div>


                        </div>
                        <div className="cardhover hover:scale-103 rounded-[15px]">
                            <button
                                className="flex items-center gap-2 gray-text small-text mb-6 button-hoverbg px-2 py-1 rounded-[10px]"
                                onClick={() => setSelected(null)} // reset selection
                            >
                                <ArrowLeft size={16} />
                                Back to Home
                            </button>
                            {/* Title */}
                            <div className="text-center mb-10">
                                <h2 className="form-heading font-medium">Choose Your KYC Type</h2>
                                <p className="gray-text medium-text">
                                    Select the verification method that suits you best
                                </p>
                            </div>

                            {/* Cards */}
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center">
                                {/* Min KYC */}
                                <div
                                    onClick={() => setSelected("min")}
                                    className="cursor-pointer  small-cards rounded-xl p-6 shadow-lg hover:scale-103 transition  w-full sm:w-[400px] max-w-md "
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-4">
                                        <div className="icon-bg  p-3 rounded-lg">
                                            <FileText className="font-themecolor" size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Min KYC</h3>
                                            <p className="gray-text mt-4 mb-4">
                                                Quick verification with basic details. Perfect for getting
                                                started fast with instant account activation and basic banking
                                                features.
                                            </p>
                                            <div className="flex flex-col space-y-3 pb-6 mb-5 border-primary-bottom">
                                                <span className="inline-block full-border px-3 py-2 rounded-md small-text font-medium">
                                                    Basic ID Verification
                                                </span>
                                                <span className="inline-block full-border px-3 py-2 rounded-md small-text font-medium">
                                                    ₹10,000 Monthly Limit
                                                </span>
                                            </div>
                                            <p className="small-text font-semibold flex items-center font-themecolor gap-1">
                                                ⚡ Fast approval in 2-3 minutes
                                            </p>
                                            <p className="small-text gray-text">
                                                Mobile recharge, bill payments, basic transfers
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                {/* Full KYC */}
                                <div
                                    onClick={() => setSelected("full")}
                                    className="cursor-pointer small-cards rounded-xl p-6 shadow-lg  hover:scale-103 transition w-full sm:w-[400px] max-w-md "
                                >

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 mb-4">
                                        <div className="icon-bg  p-3 rounded-lg">
                                            <Shield className="font-themecolor" size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">Full KYC</h3>
                                            <p className="gray-text mt-4 mb-4">
                                                Complete verification with multiple options. Unlock all
                                                features and higher limits for unlimited banking experience.
                                            </p>
                                            <div className=" flex flex-col space-y-3 pb-6 mb-5 border-primary-bottom">
                                                <span className="inline-block full-border  px-3 py-2 rounded-md small-text font-medium">
                                                    Complete Verification
                                                </span>
                                                <span className="inline-block full-border  px-3 py-2 rounded-md small-text font-medium">
                                                    Unlimited Transactions
                                                </span>
                                            </div>
                                            <p className="small-text font-semibold flex items-center font-themecolor gap-1">
                                                🔒  Maximum security & full access
                                            </p>
                                            <p className="small-text gray-text">
                                                All banking features, high-value transfers, investment options
                                            </p>
                                        </div>

                                    </div>



                                </div>
                            </div>
                            <div className="pb-8">
                                {/* Footer */}
                                <p className="gray-text text-center  mt-6">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => navigate("/Customer-Login")}
                                        className="font-themecolor font-semibold hover:underline cursor-pointer"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </div>

                    </>
                )}


            </div>
            {/* If selected -> show form */}
            {selected === "min" && <MinKYCForm pan={pan} />}
            {selected === "full" && <FullKYCForm pan={pan} />}
        </div>
    );
};

export default KYCScreen;
