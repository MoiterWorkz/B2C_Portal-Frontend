import React, { useEffect, useState } from "react";
import { getStateAndCityByPincode, submitMinKyc } from "../../../services/service";
import { v4 as uuidv4 } from "uuid"; // for generating transactionId
import { useNavigate } from "react-router-dom";

function MinKycForm({ verifiedMobile, pan }) {
      const navigate = useNavigate();
    const [pincode, setPincode] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [formValues, setFormValues] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
        residentialStatus: "",
        email: "",
        mobileNumber: verifiedMobile || "",
        alternateContactNumber: "",
        permanentAddress: "",
        correspondenceAddress: "",
        city: 0,
        state: 0,
        pincode: "",
        country: "",
        occupation: "",
        documentType: "", // default
        documentNumber: "",
        panNumber: "string",
        logId: uuidv4(),
        kycVerificationDate: new Date().toISOString(),
        kycVerifiedBy: uuidv4(),
        kycMode: "Physical",
        channel: "WEB",
        programId: 0,
        annualIncome: 0,
        pepFlag: true,
        sanctionsScreened: true,
        regulatoryReportingEnabled: true,
        partnerId: "",
        agentId: "",
        kycLevel: "min",
    });
    // ✅ Keep props in sync
    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            mobileNumber: verifiedMobile || "",
            panNumber: pan || "",
        }));
    }, [verifiedMobile, pan]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handlePincodeChange = async (e) => {
        const value = e.target.value;
        setPincode(value);
        setFormValues((prev) => ({ ...prev, pincode: value }));

        if (value.length === 6) {
            try {
                const response = await getStateAndCityByPincode(value);

                if (response?.areas) {
                    const states = [...new Map(response.areas.map(area => [area.stateId, area.state]))]
                        .map(([id, name]) => ({ id, name }));

                    const cities = response.areas.map(area => ({
                        id: area.cityId,
                        name: area.city
                    }));

                    setStateOptions(states);
                    setCityOptions(cities);

                    setFormValues(prev => ({
                        ...prev,
                        state: response.areas[0].stateId,
                        city: response.areas[0].cityId
                    }));
                }

            } catch (error) {
                console.error("Error fetching state/city:", error);
            }
        } else {
            setStateOptions([]);
            setCityOptions([]);
            setFormValues((prev) => ({ ...prev, state: "", city: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formValues.documentNumber) {
            alert("PAN number is required!");
            return;
        }

        try {
            const payload = {
                ...formValues,
                p_pan_number: formValues.panNumber,
                state: parseInt(formValues.state),       // ensure integer
                city: parseInt(formValues.city),
            };

            console.log(payload)
            console.log(JSON.stringify(payload, null, 2));
            const response = await submitMinKyc(payload);
            console.log("✅ Min KYC Submitted:", response);
            navigate("/set-pin", { state: { mobileNumber: formValues.mobileNumber } });
        } catch (err) {
            console.error("❌ KYC Submission Failed:", err.response?.data || err.message);
        }
    };




    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
            {/* Logo + Progress */}
            <div className="flex flex-col items-center mb-8">
                <img src="/logo.png" alt="logo" className="h-10 mb-2" />
                <h1 className="text-2xl font-bold">Moiter Workz</h1>
            </div>

            <div className="w-full max-w-5xl mb-10">
                <div className="flex justify-between mb-2">
                    <span className="text-sm">Min KYC - Personal Details</span>
                    <span className="text-sm text-yellow-500">60%</span>
                </div>
                <div className="w-full bg-neutral-800 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }} />
                </div>
            </div>

            {/* Form Card */}
            <div className="bg-neutral-900 p-8 rounded-2xl shadow-xl w-full max-w-5xl">

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm mb-2">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formValues.middleName}
                                    onChange={handleChange}
                                    placeholder="Enter middle name"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Father Name *</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formValues.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter Father Name"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Mother Name *</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    value={formValues.motherName}
                                    onChange={handleChange}
                                    placeholder="Enter Mother Name"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Gender *</label>
                                <select
                                    name="gender"
                                    value={formValues.gender}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="MALE">MALE</option>
                                    <option value="FEMALE">FEMALE</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"               // Important!
                                    value={formValues.dateOfBirth}   // Controlled input
                                    onChange={handleChange}          // Update state on change
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>

                        </div>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm mb-2">Email ID *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formValues.mobileNumber}
                                    readOnly
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none text-neutral-400"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Address Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Address Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-3">
                                <label className="block text-sm mb-2">Address *</label>
                                <input
                                    type="text"
                                    name="permanentAddress"
                                    value={formValues.permanentAddress}
                                    onChange={handleChange}
                                    placeholder="Enter complete address"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Pincode *</label>
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    maxLength={6}
                                    placeholder="Enter pincode"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">State *</label>
                                <select
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                >
                                    <option value="">Select state</option>
                                    {stateOptions.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">City *</label>
                                <select
                                    name="city"
                                    value={formValues.city}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                >
                                    <option value="">Select city</option>
                                    {cityOptions.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Financial Information */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Financial Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm mb-2">PAN Number *</label>
                                {/* PAN Number (always readonly) */}
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formValues.panNumber}
                                    readOnly
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-2">Occupation *</label>
                                <select
                                    name="occupation"
                                    value={formValues.occupation}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                >
                                    <option value="">Select occupation</option>
                                    <option value="Engineer">Engineer</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Teacher">Teacher</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Identity Verification */}
                    <section>
                        <h2 className="text-lg font-semibold mb-4">Identity Verification</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm mb-2">Choose ID Proof *</label>
                                <select
                                    name="documentType"
                                    value={formValues.documentType}
                                    onChange={handleChange}
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                >
                                    <option value="">Select ID proof type</option>
                                    <option value="Aadhar">Aadhar</option>
                                    <option value="Passport">Passport</option>
                                    <option value="Voter ID">Voter ID</option>
                                    <option value="PAN">PAN</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm mb-2">ID Proof Number *</label>

                                {/* ID Proof Number */}
                                <input
                                    type="text"
                                    name="documentNumber"
                                    value={formValues.documentNumber}
                                    onChange={handleChange}
                                    placeholder="Enter ID proof number"
                                    className="w-full bg-black border border-neutral-700 rounded-lg px-3 py-2 focus:outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Submit */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-yellow-600 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg"
                        >
                            🚀 Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MinKycForm;
