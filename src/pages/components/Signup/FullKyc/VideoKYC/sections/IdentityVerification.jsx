import React from "react";

import CustomSelect from "../../../../../../constants/Reusable/Customdropdown";

const IdentityVerification = ({ formValues, handleChange, setFormValues }) => {
  return (
    <section>
      <p className="mb-4 flex pb-2 border-primary-bottom small-text">Identity Verification</p>
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
          <input
            type="text"
            name="documentNumber"
            value={formValues.documentNumber}
            onChange={handleChange}
            placeholder="Enter ID proof number"
            className="w-full border full-border rounded-lg px-3 py-1 small-text"
          />
        </div>
      </div>
    </section>
  );
};

export default IdentityVerification;
