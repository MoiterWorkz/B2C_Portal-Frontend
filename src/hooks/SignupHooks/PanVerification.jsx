import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export default function PanVerification() {
    const [showModal, setShowModal] = useState(false);
    const [pan, setPan] = useState(""); // store PAN input
    const navigate = useNavigate();

    const handleVerify = async () => {
        try {
            const payload = {
                documentNumber: pan,
                metadata: {
                    ipAddress: "127.0.0.1", // replace with real IP if available
                    userAgent: navigator.userAgent,
                    headers: "custom-header",
                    channel: "WEB",
                    auditMetadata: {
                        createdBy: "system",
                        createdDate: new Date().toISOString(),
                        modifiedBy: "system",
                        modifiedDate: new Date().toISOString(),
                        header: {
                            additionalProp1: {
                                options: { propertyNameCaseInsensitive: true },
                                parent: "root",
                                root: "root"
                            }
                        }
                    }
                }
            };

            const res = await axios.post(
                "http://192.168.22.247/cs/api/Customer/get_pan_details",
                payload
            );

            console.log("PAN Verify Response:", res.data);

            if (res.data?.status === "NOT_FOUND") {
                // open Terms & Conditions modal if PAN not found
                setShowModal(true);
            } else {
                // if found, maybe navigate to dashboard
                navigate("/Dashboard");
            }
        } catch (error) {
            console.error("Error verifying PAN:", error);
            setShowModal(true); // fallback to modal if API fails
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-primary-background text-white">
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold">Welcome Back</h1>
                <p className="text-gray-400">Enter your PAN to continue</p>

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
                        onChange={(e) => setPan(e.target.value)}
                        placeholder="ABCDE 1234 F"
                        className="w-full mt-1 mb-4 p-2 rounded primary-input text-black"
                    />

                    <button
                        onClick={handleVerify}
                        className="w-full bg-yellow-300 text-black font-semibold py-2 rounded hover:opacity-90 transition"
                    >
                        Verify PAN
                    </button>

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

                        <h2 className="text-lg font-semibold text-center">
                            Terms & Conditions
                        </h2>
                        <p className="text-sm text-gray-400 text-center mt-1">
                            Account not found. Continue with registration?
                        </p>

                        <p className="text-sm text-gray-300 mt-4">
                            There is no account found with this PAN number.
                            <br />
                            <strong>
                                Would you like to continue with the KYC registration process?
                            </strong>
                        </p>

                        <div className="bg-[#2a2a2a] text-xs text-gray-400 mt-4 p-3 rounded-md">
                            By proceeding, you agree to complete our Know Your Customer (KYC)
                            verification process to create a new account.
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => navigate("/KYC")}
                                className="px-4 py-2 bg-yellow-300 text-black font-semibold rounded hover:opacity-90"
                            >
                                Yes, Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
