import React, { useState } from "react";
import { ArrowLeft, FileText, IdCard, Video, Shield } from "lucide-react";
import LOGO from "../../../../assets/logo.png";
import FullKycForm from "../FullKycForm";

// Dummy Components (replace with your actual ones)
const DocumentUpload = ({ verifiedMobile, pan, setVerified }) => <div ><FullKycForm verifiedMobile={verifiedMobile} pan={pan} /></div>;
const AadhaarKYC = () => <div className="text-white text-2xl">🪪 Aadhaar KYC Page</div>;
const VideoKYC = () => <div className="text-white text-2xl">🎥 Video KYC Page</div>;
const CKYC = () => <div className="text-white text-2xl">🛡️ CKYC Page</div>;

const FullKYCOptions = ({ verifiedMobile, pan, setVerified }) => {
  const [selectedPage, setSelectedPage] = useState(null);

  // Map options to components
  const components = {
    document: <DocumentUpload verifiedMobile={verifiedMobile} pan={pan} setVerified={setVerified} />,
    aadhaar: <AadhaarKYC />,
    video: <VideoKYC />,
    ckyc: <CKYC />,
  };

  // Options for UI
  const options = [
    {
      key: "document",
      title: "Document Upload",
      desc: "Upload ID Proof and Address Proof documents for verification",
      icon: <FileText className="font-themecolor" size={25} />,
    },
    {
      key: "aadhaar",
      title: "Aadhaar KYC",
      desc: "Quick verification using your Aadhaar card details",
      icon: <IdCard className="font-themecolor" size={25} />,
    },
    {
      key: "video",
      title: "Video KYC",
      desc: "Live video verification with document display during recording",
      icon: <Video className="font-themecolor" size={25} />,
    },
    {
      key: "ckyc",
      title: "CKYC",
      desc: "Central KYC with comprehensive verification process",
      icon: <Shield className="font-themecolor" size={25} />,
    },
  ];

  // If a page is selected, show that page full screen
  if (selectedPage) {
    return (
      <div >
        {/* Render selected component */}
        <div>{components[selectedPage]}</div>

        {/* Back button */}
        <button
          onClick={() => setSelectedPage(null)}
          className=" flex items-center gap-2 gray-text small-text button-hoverbg px-3 py-2 rounded-[10px]"
        >
          <ArrowLeft size={16} /> Back to Options
        </button>
      </div>
    );
  }

  // Otherwise, show the selection menu
  return (
    <div className="flex flex-col items-center justify-center bg-primary-background min-h-screen">
      {/* Logo + Progress */}
      <div className="w-full flex flex-col items-center mb-5">
        <div className="flex items-center gap-2 mb-6">
          <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />
        </div>
        <div className="w-2/4 flex justify-between">
          <p className="gray-text medium-text">Choose Verification Method</p>
          <p className="icon-color small-text">35%</p>
        </div>
        <div className="w-2/4 bg-gray-800 h-2 rounded-full mt-2">
          <div
            className="sign-up-button h-2 rounded-full"
            style={{ width: "35%" }}
          ></div>
        </div>
      </div>

      {/* Options Grid */}
      <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
        w-full sm:w-[600px] lg:w-[800px] xl:w-[1100px] 
        transform transition-transform duration-300 hover:scale-105 mx-auto mt-5">
        <h2 className="form-heading font-semibold text-center mb-1">
          Choose KYC Method
        </h2>
        <p className="text-center medium-text text-neutral-400 mb-6">
          Select your preferred verification method for complete KYC
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-1">
          {options.map((opt) => (
            <div
              key={opt.key}
              onClick={() => setSelectedPage(opt.key)} // 👈 Switch page
              className="cursor-pointer flex items-center py-3 px-6 rounded-xl 
                full-border card-bg hover:scale-105 transition-all duration-300"
            >
              <span className="icon-bg p-3 rounded-[8px]">{opt.icon}</span>
              <div className="p-4">
                <h3 className="Small-Heading text-left font-semibold text-white mb-1">
                  {opt.title}
                </h3>
                <p className="small-text text-left gray-text">{opt.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => setVerified(false)}
            className="mt-6 flex items-center gap-2 gray-text small-text  button-hoverbg px-2 py-1 rounded-[10px]"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to KYC Selection
          </button>
        </div>

      </div>

    </div>
  );
};

export default FullKYCOptions;
