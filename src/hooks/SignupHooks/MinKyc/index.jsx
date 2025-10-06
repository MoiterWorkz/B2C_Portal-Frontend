import React, { useState } from "react";
import MinKycMobileVerification from "./MinKycMobileverification";
import MinKycForm from "./MinKycForm";

export default function MinKyc({ pan, onBackPressed }) {
  const [verified, setVerified] = useState(false);
  const [verifiedMobile, setVerifiedMobile] = useState("");

  return (
    <>
      {!verified ? (
        <MinKycMobileVerification
          onBack={() => onBackPressed("KYCScreen-Triggered")}
          onVerified={(mobile) => {
            setVerifiedMobile(mobile);
            setVerified(true);
          }}
        />
      ) : (
        <MinKycForm verifiedMobile={verifiedMobile} pan={pan}  setVerified={setVerified}/>
      )}
    </>
  );
}
