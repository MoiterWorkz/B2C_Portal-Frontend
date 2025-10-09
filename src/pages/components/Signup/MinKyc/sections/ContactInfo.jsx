import React from "react";

const ContactInfo = ({ formValues, handleChange }) => {
  return (
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
            className="w-full border full-border rounded-lg px-3 py-1 small-text"
          />
        </div>
        <div>
          <label className="small-text font-medium flex">Mobile Number *</label>
          <input
            type="tel"
            name="mobileNumber"
            value={formValues.mobileNumber}
            readOnly
            className="w-full border full-border rounded-lg px-3 py-1 small-text cursor-not-allowed"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
