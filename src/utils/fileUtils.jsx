export const fileToBase64 = (file) => {
    // 2️⃣ Return a Promise
    return new Promise((resolve, reject) => {
        // 3️⃣ Create a FileReader
        const reader = new FileReader();

        // 4️⃣ On successful load
        reader.onload = () => {
            // 5️⃣ Extract base64 string after comma
            const base64String = reader.result?.toString().split(",")[1];
            // 6️⃣ Resolve with base64 string
            resolve(base64String || "");
        };

        // 7️⃣ On error
        reader.onerror = (error) => reject(error);

        // 8️⃣ Read the file as Data URL
        reader.readAsDataURL(file);
    });
};


// utils.js
export const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]); // strip data:prefix
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

export const createVideoPayload = async ({ blob, customerId, mobileNumber }) => {
  const base64Video = await blobToBase64(blob);
  const ip = await getIpAddress();

  return {
    customerId: parseInt(customerId),
    videoStorageUrl: "",
    videoFile: base64Video,
    ipAddress: ip,
    createdBy: "web-client",
    logId: crypto.randomUUID(),
    metadata: {
      ipAddress: ip,
      userAgent: navigator.userAgent,
      headers: "application/json",
      channel: "WEB",
      auditMetadata: {
        createdBy: "web-client",
        createdDate: new Date().toISOString(),
        modifiedBy: "web-client",
        modifiedDate: new Date().toISOString(),
        header: {},
      },
    },
  };
};


