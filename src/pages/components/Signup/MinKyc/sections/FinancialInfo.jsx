import React from "react";
import CustomSelect from "../../../../../constants/Reusable/Customdropdown";

const FinancialInfo = ({ formValues, setFormValues }) => {
  return (
    <section>
      <p className="mb-4 flex pb-2 border-primary-bottom small-text">Financial Information</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="small-text font-medium flex">PAN Number *</label>
          <input
            type="text"
            name="panNumber"
            value={formValues.panNumber}
            readOnly
            className="w-full border full-border rounded-lg px-3 py-1 small-text cursor-not-allowed"
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
  );
};

export default FinancialInfo;
