import React, { useState } from "react";
import FullKycForm from "./FullKycForm";
import FullKycMobileVerification from "../FullKyc/FullKycMobileverification";

export default function Index({ pan }) {
    const [verified, setVerified] = useState(false);
    const [verifiedMobile, setVerifiedMobile] = useState("");
    return (
        <>
            {!verified ? (
                <FullKycMobileVerification onBack={() => console.log("Back pressed")} onVerified={(mobile) => { setVerifiedMobile(mobile); setVerified(true) }} />
            ) : (
                <FullKycForm verifiedMobile={verifiedMobile} pan={pan} />
            )}
        </>
    );
}
