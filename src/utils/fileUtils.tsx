export const fileToBase64 = (file: File): Promise<string> => {
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
