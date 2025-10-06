export const generateTransactionRef = () => {
  const now = new Date();

  // YYYYMMDD
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const datePart = `${year}${month}${day}`;

  // RANDOMSTRING (6 chars)
  const randomPart = Math.random()
    .toString(36) // convert to base36 (letters + numbers)
    .substring(2, 8) // take 6 characters
    .toUpperCase(); // uppercase for readability

  return `TRX${datePart}${randomPart}`;
};

export const capitalizeFirst = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
