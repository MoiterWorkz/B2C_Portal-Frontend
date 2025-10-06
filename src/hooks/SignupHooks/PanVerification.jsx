import React, { useState } from "react";
import { useNavigate } from "react-router";
import { verifyPan } from "../../services/service"; // ✅ import the API function
import KYC from "../SignupHooks/KYC";
import LOGO from "../../assets/logo.png"
import { ArrowLeft, CreditCard, FileText, X } from "lucide-react";

export default function PanVerification() {
    const [showModal, setShowModal] = useState(false);
    const [pan, setPan] = useState(""); // store PAN input
    const [message, setMessage] = useState(""); // ✅ message state
    const [showKyc, setShowKyc] = useState(false);
    const navigate = useNavigate();

    const checkPan = async () => {
        if (!pan) {
            setMessage("PAN is required!");
            return;
        }

        try {
            const data = await verifyPan(pan.toUpperCase());

            if (data.exists) {
                setMessage("PAN already exists. You can login.");
                navigate("/Customer-Login")
                setShowModal(false); // hide modal if PAN exists
                // optionally navigate to login
                // navigate("/login");
            } else {
                setMessage("");
                setShowModal(true); // show modal if PAN does not exist
            }
        } catch (error) {
            console.error(error);
            setMessage("Error verifying PAN");
            setShowModal(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-background ">
            {showKyc ? <KYC pan={pan} setShowKyc={setShowKyc}/> : <>
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />
                </div>

                {/* Render KYC form inline after modal closes */}

                <div className="flex flex-col items-center">
                    <h1 className="text-xl font-semibold text-center mb-1 text-white">Welcome Back</h1>
                    <p className="small-text text-gray-400 text-white">Enter your PAN to continue</p>

                    {/* Card */}
                    <div className="card-bg p-6 rounded-xl shadow-lg mt-6  w-full sm:w-[400px] max-w-md mx-auto card-hover-effect">
                        <h2 className="flex items-center gap-2 font-semibold mb-2 text-white">
                            <span className="font-themecolor">  <CreditCard size={18} /></span> PAN Verification
                        </h2>
                        <p className="small-text text-gray-400 mb-4 text-white">
                            Please enter your PAN number to verify your account
                        </p>

                        <label className="small-text font-medium text-white">PAN Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={pan}
                                onChange={(e) => setPan(e.target.value.toUpperCase())} // auto-uppercase
                                placeholder="ABCDE1234F"
                                className="w-full full-border pl-[10px] pr-[8px] py-[8px] rounded-[10px] bg-neutral-800 border small-text border-neutral-700 focus:outline-none focus:ring-1 focus:ring-yellow-200 text-white"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400">
                                <CreditCard size={18} />
                            </span>
                        </div>

                        <button
                            onClick={checkPan}
                            className="w-full py-1 px-5 rounded-lg font-semibold flex items-center justify-center gap-2 sign-up-button hover:bg-yellow-300 transition mt-3"
                        >
                            Verify PAN
                        </button>

                        {message && <p className="mt-2 text-sm text-red-400">{message}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate("/LandingPage")}
                                className="flex items-center gap-2 small-text font-medium mt-4  hover:text-white mb-4 text-white"
                            >
                                <ArrowLeft size={16} /> Back to Home
                            </button>
                        </div>

                    </div>
                </div>

                {/* ✅ Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-[#222] rounded-lg p-6 w-[400px] relative shadow-lg">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-white"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full icon-color text-2xl">
                                    <FileText size={20} />
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold text-center text-white">Terms & Conditions</h2>
                            <p className="text-sm text-gray-400 text-center mt-1">
                                Account not found. Continue with registration?
                            </p>

                            <p className="text-sm text-gray-300 mt-4 text-center">
                                There is no account found with this PAN number.
                                <br />
                                <strong>Would you like to continue with the KYC registration process?</strong>
                            </p>

                            <div className="primary-input text-center border-none text-xs text-gray-400 mt-4 p-3 rounded-md">
                                By proceeding, you agree to complete our Know Your Customer (KYC) verification process to create a new account.
                            </div>

                            <div className="flex justify-end items-baseline gap-1 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2  text-white  "
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setShowKyc(true);
                                    }}
                                    className="w-2/6 py-2 px-4 rounded-lg font-semibold flex items-center items-baseline justify-center gap-2 sign-up-button  text-black hover:bg-yellow-300 transition mt-3"
                                >
                                    Yes, Continue
                                </button>
                            </div>


                        </div>
                    </div>
                )}
            </>}
        </div>
    );
}
