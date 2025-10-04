import { EditIcon, SaveIcon, X } from "lucide-react";
import React, { useState } from "react";

const MyProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Ashwin",
    lastName: "N",
    dob: "28/07/2022",
    address: "abcd",
    email: "demo@moiterworkz.com",
    mobile: "123456789",
    officialDocument: "lmnopq",
    panCard: "12345grfd32",
    photo: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile({ ...profile, [id]: value });
  };
  const handleSave = () => {
    // ✅ Add your save logic here
    console.log("Changes saved");
    setEditMode(false);
  };

  const handleCancel = () => {
    // ✅ Add your cancel logic here (e.g., reset form values)
    console.log("Edit cancelled");
    setEditMode(false);
  };
  return (
    <main className="flex-1 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          <div className="profile-heading">
            <h1 className="text-3xl">My Profile</h1>
            <p className="text-muted-foreground subheading2-size">
              Manage your personal information and preferences
            </p>
          </div>

          <div className="flex flex-wrap gap-2 profilechange-buttons">
            {!editMode ? (
              <button
                className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-sm edit-profile"
                onClick={() => setEditMode(true)}
              >
                <EditIcon size={15} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-sm save-changes"
                  onClick={handleSave}
                >
                  <SaveIcon size={15} />
                  Save Changes
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-sm cancle"
                  onClick={handleCancel}
                >
                  <X size={15} />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border p-6 card-hover-effect profile-heading">
          <div className="">
            <h4 className="leading-none">Profile Information</h4>
            <p className="text-muted-foreground subheading2-size">
              Update your personal details and contact information
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Profile initials / avatar or uploaded photo */}
            <span className="relative flex h-20 w-20 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
              {profile.photo ? (
                <img
                  src={profile.photo}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                "KA"
              )}
            </span>

            {/* Change photo button, shown only in edit mode */}
            {editMode && (
              <>
                <label
                  htmlFor="profilePhoto"
                  className="flex items-center gap-2 px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground cursor-pointer hover:bg-primary/80"
                >
                  <EditIcon size={15} />
                  Change Photo
                </label>
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => {
                        setProfile((prev) => ({
                          ...prev,
                          photo: ev.target.result,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid gap-4 md:grid-cols-2 ">
            <div className="space-y-2 ">
              <label
                htmlFor="firstName"
                className="text-sm font-medium profilecard-span"
              >
                First Name
              </label>
              <input
                id="firstName"
                value={profile.firstName}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium profilecard-span"
              >
                Last Name
              </label>
              <input
                id="lastName"
                value={profile.lastName}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="dob"
              className="text-sm font-medium profilecard-span"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={profile.dob}
              onChange={handleChange}
              disabled={!editMode}
              className={`
        w-full rounded-md px-3 py-1 profilecard-input 
        ${
          editMode
            ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
            : "border-0 bg-transparent"
        }
      `}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="address"
              className="text-sm font-medium profilecard-span"
            >
              Contact Address
            </label>
            <textarea
              id="address"
              value={profile.address}
              onChange={handleChange}
              disabled={!editMode}
              rows={3}
              className={`
        w-full rounded-md px-3 py-2 resize-none profilecard-input 
        ${
          editMode
            ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
            : "border-0 bg-transparent"
        }
      `}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium profilecard-span"
              >
                Email ID
              </label>
              <input
                type="email"
                id="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="mobile"
                className="text-sm font-medium profilecard-span"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={profile.mobile}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="officialDocument"
                className="text-sm font-medium profilecard-span"
              >
                Official Valid Document
              </label>
              <input
                id="officialDocument"
                value={profile.officialDocument}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="panCard"
                className="text-sm font-medium profilecard-span"
              >
                PAN Card
              </label>
              <input
                id="panCard"
                value={profile.panCard}
                onChange={handleChange}
                disabled={!editMode}
                className={`
          w-full rounded-md px-3 py-1 profilecard-input 
          ${
            editMode
              ? "border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none subheading-profilecard"
              : "border-0 bg-transparent"
          }
        `}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
