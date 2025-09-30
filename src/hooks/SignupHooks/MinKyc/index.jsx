import React, { useState } from "react";
import MinKycMobileVerification from "./MinKycMobileverification";
import MinKycForm from "./MinKycForm";

export default function Index({pan}) {
    const [verified, setVerified] = useState(false);
    const [verifiedMobile, setVerifiedMobile] = useState("");
    // console.log(verified)
    return (
        <>
            {!verified ? (
                <MinKycMobileVerification onBack={() => console.log("Back pressed")} onVerified={(mobile) => { setVerifiedMobile(mobile); setVerified(true) }} />
            ) : (
                <MinKycForm verifiedMobile={verifiedMobile} pan={pan}/>
            )}
        </>
    );
}
