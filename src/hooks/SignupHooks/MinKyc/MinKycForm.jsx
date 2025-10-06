import React, { useEffect, useState } from "react";
import { getStateAndCityByPincode, submitMinKyc, pepCheck, sanctionCheck } from "../../../services/service";
import { v4 as uuidv4 } from "uuid"; // for generating transactionId
import { useNavigate } from "react-router-dom";
import LOGO from "../../../assets/logo.png";
import { ArrowLeft, CheckIcon } from "lucide-react";
import CustomSelect from "../../../constants/Reusable/Customdropdown";

function MinKycForm({ verifiedMobile, pan, setVerified }) {
    const navigate = useNavigate();
    const [pincode, setPincode] = useState("");
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    const [checked, setChecked] = useState(false);
    const [errors, setErrors] = useState({});
    const [partners, setPartners] = useState([]);
    const [formValues, setFormValues] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        fatherName: "",
        motherName: "",
        dateOfBirth: "",
        gender: "",
        // nationality: "",
        // residentialStatus: "",
        email: "",
        mobileNumber: verifiedMobile || "",
        alternateContactNumber: "",
        permanentAddress: "",
        correspondenceAddress: "",
        city: 0,
        state: 0,
        pincode: "",
        // country: "",
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
        pepFlag: false,
        sanctionsScreened: false,
        regulatoryReportingEnabled: true,
        partnerId: "",
        agentId: "",
        kycLevel: "min",
        termsAndConditions: false,
    });
    // console.log(formValues)
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch("http://192.168.22.247/fes/api/Export/partner_summary_export");
                const data = await res.json();
                if (Array.isArray(data)) {
                    setPartners(data);
                } else {
                    setPartners([data]); // in case API returns single object
                }
            } catch (err) {
                console.error("❌ Error fetching partners:", err);
            }
        };

        fetchPartners();
    }, []);
    // Fetch PEP flag when user fills required fields
    useEffect(() => {
        const fetchPepFlag = async () => {
            if (formValues.firstName && formValues.lastName && formValues.dateOfBirth) {
                try {
                    const res = await pepCheck(formValues);

                    if (res?.isPep !== undefined) {
                        setFormValues((prev) => ({ ...prev, pepFlag: res.isPep }));
                    }
                } catch (err) {
                    console.error("❌ Error fetching PEP flag:", err);
                }
            }
        };
        const fetchSanctions = async () => {
            if (formValues.firstName && formValues.lastName && formValues.dateOfBirth) {
                try {
                    const res = await sanctionCheck(formValues);
                    if (res?.sanctionsScreened !== undefined) {
                        setFormValues((prev) => ({ ...prev, sanctionsScreened: res.sanctionsScreened }));
                    }
                    if (res?.message) {
                        console.warn("Sanctions API Message:", res.message);
                    }
                } catch (err) {
                    console.error("❌ Error fetching sanctions:", err);
                }
            }
        };

        fetchSanctions();
        fetchPepFlag();
    }, [
        formValues.firstName,
        formValues.middleName,
        formValues.lastName,
        formValues.dateOfBirth,
        formValues.country,
    ]);


    // ✅ Keep props in sync
    useEffect(() => {
        setFormValues((prev) => ({
            ...prev,
            mobileNumber: verifiedMobile || "",
            panNumber: pan || "",
        }));
    }, [verifiedMobile, pan]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues((prev) => ({
            ...prev, [name]: value,
            [name]: type === "checkbox" ? checked : value,
        }));
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
        let newErrors = {};
        if (!formValues.documentNumber) {
            alert("PAN number is required!");
            return;
        }
        if (!formValues.termsAndConditions) {
            newErrors.termsAndConditions = "You must agree to the Terms and Conditions.";
        }
        setErrors(newErrors);
        try {
            const payload = {
                ...formValues,
                // p_pan_number: formValues.panNumber,
                state: parseInt(formValues.state),       // ensure integer
                city: parseInt(formValues.city),
            };
            // console.log(JSON.stringify(payload, null, 2));
            // console.log(payload)
            const response = await submitMinKyc(payload);
            // console.log("✅ Min KYC Submitted:", response);
            navigate("/set-pin", { state: { mobileNumber: formValues.mobileNumber } });
        } catch (err) {
            console.error("❌ KYC Submission Failed:", err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-primary-background text-white flex flex-col items-center py-10 px-4">
            {/* Logo + Progress */}
            <div className="w-full flex flex-col items-center mb-5">
                {/* Logo */}
                <div className="flex items-center gap-2 mb-6">
                    <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />

                </div>
                <div className=" w-1/4 flex justify-between">
                    <p className=" gray-text small-text">Min KYC - Personal Details</p>
                    <p className="icon-color small-text">60%</p>
                </div>
                <div className="w-1/4 bg-gray-800 h-2 rounded-full mt-2">

                    <div
                        className="sign-up-button h-2 rounded-full"
                        style={{ width: "60%" }}
                    ></div>
                </div>
            </div>

            {/* Form Card */}
            <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
                w-full sm:w-[600px] lg:w-[800px] xl:w-[1100px] 
                transform transition-transform duration-300 hover:scale-105 mx-auto mt-5">

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Personal Information */}
                    <section>
                        <p className=" mb-4 flex pb-2 border-primary-bottom small-text">Personal Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="small-text font-medium flex">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formValues.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter middle name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Middle Name</label>
                                <input
                                    type="text"
                                    name="middleName"
                                    value={formValues.middleName}
                                    onChange={handleChange}
                                    placeholder="Enter middle name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formValues.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Father Name *</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formValues.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter Father Name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Mother Name *</label>
                                <input
                                    type="text"
                                    name="motherName"
                                    value={formValues.motherName}
                                    onChange={handleChange}
                                    placeholder="Enter Mother Name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Gender *</label>
                                <CustomSelect
                                    options={[
                                        { id: "MALE", name: "MALE" },
                                        { id: "FEMALE", name: "FEMALE" },
                                        { id: "OTHER", name: "OTHER" },
                                    ]}
                                    value={formValues.gender}
                                    onChange={(val) => setFormValues(prev => ({ ...prev, gender: val }))}
                                    placeholder="Select Gender"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"               // Important!
                                    value={formValues.dateOfBirth}   // Controlled input
                                    onChange={handleChange}          // Update state on change
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                                <p className="text-[10px] gray-text">You can type the date directly (DD/MM/YYYY) or click the calendar icon</p>
                            </div>

                        </div>
                    </section>

                    {/* Contact Information */}
                    <section>
                        <p className="mb-4 flex pb-2 border-primary-bottom small-text">Contact Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="small-text font-medium flex">Email ID *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formValues.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Mobile Number *</label>
                                <input
                                    type="tel"
                                    name="mobileNumber"
                                    value={formValues.mobileNumber}
                                    readOnly
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Address Information */}
                    <section>
                        <p className=" mb-4 flex pb-2 border-primary-bottom small-text">Address Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-3">
                                <label className="small-text font-medium flex">Address *</label>
                                <input
                                    type="text"
                                    name="permanentAddress"
                                    value={formValues.permanentAddress}
                                    onChange={handleChange}
                                    placeholder="Enter complete address"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Pincode *</label>
                                <input
                                    type="text"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    maxLength={6}
                                    placeholder="Enter pincode"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">State *</label>
                                <CustomSelect
                                    options={stateOptions} // [{id, name}, ...]
                                    value={formValues.state} // controlled value
                                    onChange={(val) =>
                                        setFormValues((prev) => ({ ...prev, state: val }))
                                    } // update state
                                    placeholder="Select state"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">City *</label>
                                <CustomSelect
                                    options={cityOptions} // Array of cities: [{id, name}, ...]
                                    value={formValues.city} // Controlled value from form state
                                    onChange={(val) =>
                                        setFormValues((prev) => ({ ...prev, city: val }))
                                    } // Update city in form state
                                    placeholder="Select city" // Text shown when nothing is selected
                                />
                            </div>

                        </div>
                    </section>

                    {/* Financial Information */}
                    <section>
                        <p className="  mb-4 flex pb-2 border-primary-bottom small-text">Financial Information</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="small-text font-medium flex">PAN Number *</label>
                                {/* PAN Number (always readonly) */}
                                <input
                                    type="text"
                                    name="panNumber"
                                    value={formValues.panNumber}
                                    readOnly
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">Occupation *</label>
                                <CustomSelect
                                    options={[
                                        { id: "Engineer", name: "Engineer" },
                                        { id: "Doctor", name: "Doctor" },
                                        { id: "Teacher", name: "Teacher" },
                                    ]}
                                    value={formValues.occupation}
                                    onChange={(val) => setFormValues(prev => ({ ...prev, occupation: val }))}
                                    placeholder="Select occupation"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Identity Verification */}
                    <section>
                        <p className=" mb-4 flex pb-2 border-primary-bottom small-text">Identity Verification</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="small-text font-medium flex">Choose ID Proof *</label>
                                <CustomSelect
                                    options={[
                                        { id: "Aadhaar", name: "Aadhaar" },
                                        { id: "Passport", name: "Passport" },
                                        { id: "Voter ID", name: "Voter ID" },
                                        { id: "PAN", name: "PAN" },
                                    ]}
                                    value={formValues.documentType}
                                    onChange={(val) => setFormValues(prev => ({ ...prev, documentType: val }))}
                                    placeholder="Select ID proof type"
                                />
                            </div>
                            <div>
                                <label className="small-text font-medium flex">ID Proof Number *</label>

                                {/* ID Proof Number */}
                                <input
                                    type="text"
                                    name="documentNumber"
                                    value={formValues.documentNumber}
                                    onChange={handleChange}
                                    placeholder="Enter ID proof number"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div>


                            <div>
                                <label className="small-text font-medium flex">
                                    Select Partner *
                                </label>
                                <CustomSelect
                                    options={partners.map((p) => ({
                                        id: String(p.partnerId),   // ✅ ensure id is string
                                        name: p.partnerName,
                                    }))}
                                    value={formValues.partnerId}
                                    onChange={(val) =>
                                        setFormValues((prev) => ({ ...prev, partnerId: String(val) })) // ✅ cast to string
                                    }
                                    placeholder="-- Select Partner --"
                                />
                            </div>

                        </div>
                    </section>
                    <label className="flex items-center space-x-2 text-[11px] text-white cursor-pointer">
                        <input
                            type="checkbox"
                            name="termsAndConditions"
                            checked={formValues.termsAndConditions}
                            onChange={handleChange}
                            onClick={() => { setChecked(!checked) }}
                            className="appearance-none w-3 h-3 full-border rounded-sm 
                   bg-transparent cursor-pointer
                  font-themecolor
                   relative transition-all"
                        />
                        {/* Custom tick mark */}
                        <span
                            className={`pointer-events-none absolute w-3 h-3 flex items-center justify-center text-[10px] font-bold ${checked ? "text-black" : "text-transparent"
                                }`}
                        >
                            <CheckIcon />
                        </span>

                        <span>
                            I agree to the{" "}
                            <a
                                href="https://www.discover.com/credit-cards/digital-wallets/terms-conditions.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-themecolor underline "
                            >
                                Terms and Conditions
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://www.securityfederalbank.com/business/digital-resources/digital-wallet-terms-and-conditions"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-themecolor underline"
                            >
                                Privacy Policy
                            </a>
                        </span>
                    </label>
                    {/* Submit */}
                    <div className="flex justify-start gap-2">
                        <button
                            className=" flex items-center gap-1 gray-text small-text  button-hoverbg px-2 py-1 rounded-[10px]"
                            onClick={() => setVerified(false)}
                        >
                            <ArrowLeft className="w-4 h-4 " />
                            Back
                        </button>

                        <button
                            type="submit"
                            className=" py-1 px-2 rounded-lg  flex items-center justify-center gap-2 sign-up-button text-black transition"
                        >
                            Complete Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MinKycForm;
