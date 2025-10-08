import React, { useState } from "react";
import FullKycForm from "./FullKycForm";
import FullKycMobileVerification from "../FullKyc/FullKycMobileverification";
import  FullKYCOptions from "../FullKyc/FullKycOptions/FullKYCOptions";

export default function Index({ pan,onBackPressed }) {
    const [verified, setVerified] = useState(false);
    const [verifiedMobile, setVerifiedMobile] = useState("");
    return (
        <>
        {/* <><FullKYCOptions/></> */}
            {!verified ? (
                <FullKycMobileVerification  onBack={() => onBackPressed("KYCScreen-Triggered")} onVerified={(mobile) => { setVerifiedMobile(mobile); setVerified(true) }} />
            ) : (
                // <FullKycForm verifiedMobile={verifiedMobile} pan={pan} />
                <FullKYCOptions verifiedMobile={verifiedMobile} pan={pan} setVerified={setVerified}/>
            )}
        </>
    );
}
