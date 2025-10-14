import React from "react";
import CustomSelect from "../../../../../../constants/Reusable/Customdropdown";

const AddressInfo = ({
  formValues,
  handleChange,
  handlePincodeChange,
  pincode,
  stateOptions,
  cityOptions,
  setFormValues,
  pincodeError, 
   loadingPincode,   
}) => {
  return (
    <section>
  <p className="mb-4 flex pb-2 border-primary-bottom small-text">
    Address Information
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-3">
      <label className="small-text font-medium flex">Address *</label>
      <input
        type="text"
        name="permanentAddress"
        value={formValues.permanentAddress}
        onChange={handleChange}
        placeholder="Enter complete address"
        className="w-full border full-border rounded-lg px-3 py-1 small-text"
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
        className={`w-full border full-border rounded-lg px-3 py-1 small-text ${
          pincodeError ? "border-red-500" : ""
        }`}
      />
      {loadingPincode && (
        <p className="text-[11px] text-gray-400 mt-1">Fetching location...</p>
      )}
      {pincodeError && (
        <p className="text-[11px] text-red-500 mt-1">{pincodeError}</p>
      )}
    </div>

    <div>
      <label className="small-text font-medium flex">State *</label>
      <CustomSelect
        options={stateOptions}
        value={formValues.state}
        onChange={(val) =>
          setFormValues((prev) => ({ ...prev, state: val }))
        }
        placeholder="Select state"
      />
    </div>

    <div>
      <label className="small-text font-medium flex">City *</label>
      <CustomSelect
        options={cityOptions}
        value={formValues.city}
        onChange={(val) =>
          setFormValues((prev) => ({ ...prev, city: val }))
        }
        placeholder="Select city"
      />
    </div>
  </div>
</section>

  );
};

export default AddressInfo;
