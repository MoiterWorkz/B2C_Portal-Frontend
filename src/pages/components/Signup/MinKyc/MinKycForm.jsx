import React from "react";
import { useNavigate } from "react-router-dom";
import { useKycForm } from "./hooks/useKycForm";
import PersonalInfo from "./sections/PersonalInfo";
import ContactInfo from "./sections/ContactInfo";
import AddressInfo from "./sections/AddressInfo";
import FinancialInfo from "./sections/FinancialInfo";
import IdentityVerification from "./sections/IdentityVerification";
import LOGO from "../../../../assets/logo.png";
import { ArrowLeft, CheckIcon } from "lucide-react";

export default function MinKycForm({ verifiedMobile, pan, setVerified }) {
  const navigate = useNavigate();
  const {
    formValues, setFormValues,
    pincode, setPincode,
    stateOptions, cityOptions,
    checked, setChecked,
    errors,
    handleChange, handlePincodeChange, handleSubmit
  } = useKycForm(verifiedMobile, pan, navigate);
  return (
    <div className="min-h-screen bg-primary-background text-white flex flex-col items-center py-10 px-4">
      <div className="w-full flex flex-col items-center mb-5">
        <img src={LOGO} alt="Moiter Workz Logo" className="h-9 mb-6" />
      </div>

      <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
        w-full sm:w-[600px] lg:w-[800px] xl:w-[1100px] mx-auto">

        <form onSubmit={handleSubmit} className="space-y-8">
          <PersonalInfo
            formValues={formValues}
            handleChange={handleChange}
            setFormValues={setFormValues}
          />
          <ContactInfo formValues={formValues} handleChange={handleChange} />
          <AddressInfo {...{ formValues, handleChange, handlePincodeChange, pincode, stateOptions, cityOptions, setFormValues }} />
          <FinancialInfo {...{ formValues, setFormValues }} />
          <IdentityVerification {...{ formValues, handleChange, setFormValues }} />

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
            <span
              className={`absolute w-3 h-3 flex items-center justify-center text-[10px] font-bold ${checked ? "text-black" : "text-transparent"}`}
            >
              <CheckIcon />
            </span>
            <span>
              I agree to the{" "}
              <a href="#" className="font-themecolor underline">Terms</a> and{" "}
              <a href="#" className="font-themecolor underline">Privacy Policy</a>
            </span>
          </label>

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
