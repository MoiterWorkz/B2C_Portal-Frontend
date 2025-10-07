import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // for generating transactionId
import { getPublicIp } from "../services/ipService";
import { CodeSquare } from "lucide-react";
// Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://192.168.22.247";
const ip = await getPublicIp();
// Common metadata
const getCommonMetadata = () => ({
  ipAddress: ip || "0.0.0.0",
  userAgent: navigator.userAgent,
  headers: "string",
  channel: "WEB",
  auditMetadata: {
    createdBy: null,
    createdDate: new Date().toISOString(),
    modifiedBy: null,
    modifiedDate: new Date().toISOString(),
    header: {
      additionalProp1: {
        options: { propertyNameCaseInsensitive: true },
        parent: "string",
        root: "string",
      },
      additionalProp2: {
        options: { propertyNameCaseInsensitive: true },
        parent: "string",
        root: "string",
      },
      additionalProp3: {
        options: { propertyNameCaseInsensitive: true },
        parent: "string",
        root: "string",
      },
    },
  },
});

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — add metadata
api.interceptors.request.use(
  (config) => {
    if (config.method === "post" || config.method === "put") {
      config.data = {
        ...config.data,
        metadata: getCommonMetadata(),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic POST request
export const postRequest = async (endpoint, payload) => {
  try {
    const response = await api.post(endpoint, payload);

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw error;
  }
};

export const getRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw error;
  }
};

// ✅ PAN Verification
export const verifyPan = async (panNumber) => {
  return postRequest("/cs/api/Customer/get_pan_details", {
    documentNumber: panNumber,
  });
};

// ✅ Mobile Verification Flow
export const checkMobileNumber = async (mobileNumber) => {
  return postRequest("/cs/api/Customer/Phonenumber", { mobileNumber });
};

export const generateOtp = async (mobileNumber, transactionId = uuidv4()) => {
  return postRequest("/cs/api/Customer/generate_otp", {
    mobileNumber,
    transactionId,
  });
};

export const verifyOtp = async (transactionId, otp) => {
  return postRequest("/cs/api/Customer/verify_otp", { transactionId, otp });
};

export const resendOtp = async (transactionId) => {
  return postRequest("/cs/api/Customer/resend_otp", { transactionId });
};

export const getStateAndCityByPincode = async (pincode) => {
  return postRequest("/cs/api/Customer/Pincode", { pincode });
};

export const submitMinKyc = async (formData) => {
  return postRequest("/cs/api/Customer/min_kyc", {
    ...formData,
  });
};

export const submitFullKyc = async (formData) => {
  return postRequest("/cs/api/Customer/full_kyc", {
    ...formData,
  });
};

export const pepCheck = async ({
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  country,
}) => {
  const payload = {
    givenNames: firstName + (middleName ? ` ${middleName}` : ""),
    lastName,
    dob: dateOfBirth,
    country: country || "IN",
    entityType: "individual",
  };

  return postRequest("/cs/api/Customer/pep_check", payload);
};

export const sanctionCheck = async ({
  firstName,
  middleName,
  lastName,
  dateOfBirth,
  country,
}) => {
  const payload = {
    givenNames: firstName + (middleName ? ` ${middleName}` : ""),
    lastName,
    dob: dateOfBirth,
    country: country || "IN",
  };
  return postRequest("/cs/api/Customer/sanction-check", payload);
};

// ✅ Set Account PIN (Password API)
export const setAccountPin = async (mobileNumber, pin) => {
  return postRequest("/cs/api/Customer/password", {
    customerId,
    mobileNumber,
    password: pin,
  });
};

// ✅ Login with Phone + PIN
export const loginWithPin = async (mobileNumber, password) => {
  return postRequest("/cs/api/Customer/login", {
    mobileNumber,
    password,
  });
};

// wallet recharge init

export const rechargeWallet = (payload) =>
  postRequest("/cs/api/Customer/recharge-wallet", {
    ...payload,
    logId: uuidv4(),
  });

export const moveTransaction = (payload) =>
  postRequest("/cs/api/Customer/move-transaction", payload);

export const debitWallet = (payload) =>
  postRequest("/cs/api/Customer/debit-wallet", payload);

export const fetchDashboard = (id) =>
  getRequest(`cs/api/Customer/dashboard?customerId=${id}`);


export const uploadVideoKyc = async (payload) => {
  return postRequest("/api/videokyc/uploadVideoKyc", payload);
};