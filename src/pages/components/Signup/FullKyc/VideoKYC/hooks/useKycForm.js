import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getStateAndCityByPincode, submitMinKyc, pepCheck, sanctionCheck } from "../../../../../../services/service";


export function useKycForm(verifiedMobile, pan, navigate) {
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [checked, setChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    motherName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobileNumber: verifiedMobile || "",
    permanentAddress: "",
    city: 0,
    state: 0,
    pincode: "",
    occupation: "",
    documentType: "",
    documentNumber: "",
    panNumber: pan || "",
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
    partnerId: "2",
    agentId: "",
    kycLevel: "min",
    termsAndConditions: false,
  });

  useEffect(() => {
    if (formValues.firstName && formValues.lastName && formValues.dateOfBirth) {
      pepCheck(formValues).then(res => {
        if (res?.isPep !== undefined) {
          setFormValues(prev => ({ ...prev, pepFlag: res.isPep }));
        }
      });

      sanctionCheck(formValues).then(res => {
        if (res?.sanctionsScreened !== undefined) {
          setFormValues(prev => ({ ...prev, sanctionsScreened: res.sanctionsScreened }));
        }
      });
    }
  }, [formValues.firstName, formValues.lastName, formValues.dateOfBirth]);

  useEffect(() => {
    setFormValues(prev => ({
      ...prev,
      mobileNumber: verifiedMobile || "",
      panNumber: pan || "",
    }));
  }, [verifiedMobile, pan]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value.trim();
    setPincode(value);
    setFormValues((prev) => ({ ...prev, pincode: value }));
    setPincodeError("");

    if (value.length === 6) {
      setLoadingPincode(true);
      try {
        const response = await getStateAndCityByPincode(value);

        if (response?.areas && response.areas.length > 0) {
          const uniqueStates = [
            ...new Map(response.areas.map((area) => [area.stateId, area.state])),
          ].map(([id, name]) => ({ id, name }));

          const cities = response.areas.map((area) => ({
            id: area.cityId,
            name: area.city,
          }));

          setStateOptions(uniqueStates);
          setCityOptions(cities);

          // Preselect if only one state/city found
          setFormValues((prev) => ({
            ...prev,
            state: response.areas[0].stateId,
            city: response.areas[0].cityId,
          }));
        } else {
          setPincodeError("Invalid or unsupported pincode. Please select manually.");
          setStateOptions([]);
          setCityOptions([]);
          setFormValues((prev) => ({ ...prev, state: "", city: "" }));
        }
      } catch (error) {
        console.error("❌ Error fetching state/city:", error);
        setPincodeError("Unable to fetch location. Please select manually.");
        setStateOptions([]);
        setCityOptions([]);
        setFormValues((prev) => ({ ...prev, state: "", city: "" }));
      } finally {
        setLoadingPincode(false);
      }
    } else {
      // Reset when pincode incomplete
      setPincodeError("");
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
    if (!formValues.termsAndConditions) {
      setErrors({ termsAndConditions: "You must agree to Terms & Conditions" });
      return;
    }

    const payload = {
      ...formValues,
      state: parseInt(formValues.state),
      city: parseInt(formValues.city),
    };

    try {
      const res = await submitMinKyc(payload);
      const message = res?.message || "";
      const match = message.match(/New Customer Created:\s*(\d+)/);
      const customerId = match ? match[1] : null;
      if (customerId) {
        navigate("/VideoKYC", {
          state: {
            mobileNumber: formValues.mobileNumber,
            customerId: customerId
          }
        });
      } else {
        console.warn("⚠️ Could not extract customer ID from message:", message);
      }
    } catch (err) {
      console.error("❌ KYC Submission Failed:", err.response?.data || err.message);
    }
  };

  return {
    formValues, setFormValues,
    pincode, setPincode,
    stateOptions, cityOptions,
    checked, setChecked,
    errors,
    handleChange, handlePincodeChange, handleSubmit
  };
}
