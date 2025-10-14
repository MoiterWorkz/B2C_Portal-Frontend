import CustomSelect from "../../../../../constants/Reusable/Customdropdown";

const PersonalInfo = ({ formValues, handleChange, setFormValues }) => (
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
      {/* <div>
                                <label className="small-text font-medium flex">Father Name *</label>
                                <input
                                    type="text"
                                    name="fatherName"
                                    value={formValues.fatherName}
                                    onChange={handleChange}
                                    placeholder="Enter Father Name"
                                    className="w-full  border full-border rounded-lg px-3 py-1  small-text"
                                />
                            </div> */}
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
);

export default PersonalInfo;
