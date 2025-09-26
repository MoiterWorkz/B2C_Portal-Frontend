import React, { useState } from "react";
import { useNavigate } from "react-router";
import { verifyPan } from "../../services/service"; // ✅ import the API function
import KYC from "../SignupHooks/KYC"

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-background text-white">


            {/* Render KYC form inline after modal closes */}
            {showKyc ? <KYC pan={pan}/> : <>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="small-text text-gray-400">Enter your PAN to continue</p>

                    {/* Card */}
                    <div className="card-bg p-6 rounded-xl shadow-lg mt-6 w-96">
                        <h2 className="flex items-center gap-2 font-semibold mb-2">
                            <span className="text-yellow-400">📄</span> PAN Verification
                        </h2>
                        <p className="small-text text-gray-400 mb-4">
                            Please enter your PAN number to verify your account
                        </p>

                        <label className="Small-text font-semibold">PAN Number</label>
                        <input
                            type="text"
                            value={pan}
                            onChange={(e) => setPan(e.target.value.toUpperCase())} // auto-uppercase
                            placeholder="ABCDE1234F"
                            className="w-full mt-1 mb-4 p-2 rounded primary-input text-black"
                        />

                        <button
                            onClick={checkPan}
                            className="w-full bg-yellow-300 text-black font-semibold py-2 rounded hover:opacity-90 transition"
                        >
                            Verify PAN
                        </button>

                        {message && <p className="mt-2 text-sm text-red-400">{message}</p>}

                        <button
                            onClick={() => navigate("/LandingPage")}
                            className="mt-3 text-sm text-gray-400 hover:text-white flex items-center gap-1"
                        >
                            ← Back to Home
                        </button>
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
                                ✖
                            </button>

                            <div className="flex justify-center mb-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-yellow-500/20 rounded-full text-yellow-400 text-2xl">
                                    📑
                                </div>
                            </div>

                            <h2 className="text-lg font-semibold text-center">Terms & Conditions</h2>
                            <p className="text-sm text-gray-400 text-center mt-1">
                                Account not found. Continue with registration?
                            </p>

                            <p className="text-sm text-gray-300 mt-4 text-center">
                                There is no account found with this PAN number.
                                <br />
                                <strong>Would you like to continue with the KYC registration process?</strong>
                            </p>

                            <div className="bg-[#2a2a2a] text-xs text-gray-400 mt-4 p-3 rounded-md">
                                By proceeding, you agree to complete our Know Your Customer (KYC) verification process to create a new account.
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setShowKyc(true);
                                    }}
                                    className="px-4 py-2 bg-yellow-300 text-black font-semibold rounded hover:opacity-90"
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
