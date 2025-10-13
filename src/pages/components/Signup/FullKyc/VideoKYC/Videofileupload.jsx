import React, { useState, useRef } from "react";
import { ArrowLeft, VideoIcon } from "lucide-react";
import LOGO from "../../../../../assets/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadVideoKyc } from "../../../../../services/service";
import { createVideoPayload } from "../../../../../utils/fileUtils";

const VideofileUpload = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const videoRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const customerID = location?.state?.customerId;
  const mobileNumber = location?.state?.mobileNumber;

  // console.log("🎥 Customer ID:", customerID);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please grant permission and try again.");
    }
  };
  const startRecording = async () => {
    if (!stream) await startCamera();

    const mediaStream = stream || (await navigator.mediaDevices.getUserMedia({ video: true, audio: true }));
    const recorder = new MediaRecorder(mediaStream);
    let chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      setVideoUrl(URL.createObjectURL(blob));

      try {
        const payload = await createVideoPayload({ blob, customerId: customerID, mobileNumber });
        const res = await uploadVideoKyc(payload);
        // console.log("✅ Video KYC Upload Success:", res.data);
        alert("Video KYC submitted successfully!");
        navigate("/set-pin", { state: { customerId: customerID, mobileNumber } });
      } catch (err) {
        console.error("❌ Video KYC Upload Failed:", err.response?.data || err.message);
        alert("Video upload failed. Please try again.");
      }
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);

    setTimeout(() => {
      recorder.stop();
      mediaStream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }, 10000);
  };
  const handleDummySubmit = async () => {
    // create dummy base64 string (text encoded as base64)
    const dummyBase64 = btoa("dummy video file content"); // ✅ converts text → base64

    const payload = {
      customerId: parseInt(customerID) || 2000070,
      videoStorageUrl: "https://dummyvideo.test/video.mp4",
      videoFile: dummyBase64, // ✅ send base64 string
      ipAddress: "192.168.0.101",
      createdBy: "test-user",
      logId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      metadata: {
        ipAddress: "192.168.0.101",
        userAgent: navigator.userAgent,
        headers: "application/json",
        channel: "WEB",
        auditMetadata: {
          createdBy: "test-user",
          createdDate: new Date().toISOString(),
          modifiedBy: "test-user",
          modifiedDate: new Date().toISOString(),
          header: {}
        }
      }
    };

    // console.log("📤 Sending Dummy Payload:", payload);

    try {
      const res = await axios.post(
        "http://192.168.22.247/cs/api/Customer/video-kyc",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("✅ Dummy Video KYC Success:", res.data);
      alert("Dummy Video KYC submitted successfully!");
      navigate("/set-pin", { state: { customerId: customerID, mobileNumber } });
    } catch (err) {
      console.error("❌ Dummy Video KYC Failed:", err.response?.data || err.message);
      alert("Dummy API call failed. Check console for details.");
    }
  };


  return (
    <div className="min-h-screen bg-primary-background flex flex-col items-center justify-center text-white font-sans">
      {/* Logo + Progress */}
      <div className="w-full flex flex-col items-center mb-5">
        <div className="flex items-center gap-2 mb-6">
          <img src={LOGO} alt="Moiter Workz Logo" className="h-9" />
        </div>
        <div className="w-2/4 flex justify-between">
          <p className="gray-text medium-text">Video KYC Recording</p>
          <p className="icon-color small-text">70%</p>
        </div>
        <div className="w-2/4 bg-gray-800 h-2 rounded-full mt-2">
          <div className="sign-up-button h-2 rounded-full" style={{ width: "70%" }}></div>
        </div>
      </div>

      {/* Card */}
      <div className="cardhover rounded-2xl shadow-xl p-10 text-center 
                w-full sm:w-[600px] lg:w-[800px] xl:w-[1100px] 
                transform transition-transform duration-300 hover:scale-105 mt-5 mb-8">
        {/* Title */}
        <div className="text-center mb-10 flex flex-col items-center">
          <VideoIcon size={50} />
          <h2 className="form-heading font-medium">Video KYC Verification</h2>
          <p className="gray-text medium-text">
            Press start to begin your video verification
          </p>
        </div>

        {/* Camera Section */}
        <div className="w-full sm:w-[300px] lg:w-[400px] xl:w-[600px] h-[300px] bg-gradient-to-b from-[#0a1220] to-[#010409] border border-gray-700 rounded-2xl flex flex-col items-center justify-center mb-8 shadow-md mx-auto">
          {videoUrl ? (
            <video src={videoUrl} controls className="w-full h-full rounded-2xl object-cover" />
          ) : stream ? (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full rounded-2xl object-cover" />
          ) : (
            <div className="flex flex-col items-center gap-3 text-gray-400">
              <VideoIcon size={30} />
              <p className="text-sm">Camera Preview</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mx-auto px-7 py-5 text-left card-bg full-border rounded-[8px] w-full sm:w-[300px] lg:w-[400px] xl:w-[600px]">
          <h2 className="medium-text font-semibold mb-3">Instructions for Video KYC:</h2>
          <ul className="small-text gray-text list-disc ml-5 space-y-1">
            <li>Ensure good lighting on your face</li>
            <li>Look directly at the camera</li>
            <li>Show your ID document clearly to the camera</li>
            <li>Speak clearly when prompted</li>
            <li>Recording will be 10 seconds</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between w-2/4 mt-6 mx-auto gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 gray-text small-text button-hoverbg px-3 py-2 rounded-[10px]"
          >
            <ArrowLeft size={16} /> Back to Details Form
          </button>

          <button
            onClick={startRecording}
            disabled={isRecording}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${isRecording ? "bg-gray-500 cursor-not-allowed" : "sign-up-button text-black hover:bg-yellow-300 transition"
              }`}
          >
            {isRecording ? "Recording..." : (<><VideoIcon size={20} /> Start Video Recording</>)}
          </button>
          <button
            onClick={handleDummySubmit}
            className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${isRecording ? "bg-gray-500 cursor-not-allowed" : "sign-up-button text-black hover:bg-yellow-300 transition"
              }`}
          >
            Send Dummy Video Data
          </button>

        </div>
      </div>
    </div>
  );
};

export default VideofileUpload;
