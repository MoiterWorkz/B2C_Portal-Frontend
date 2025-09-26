let cachedIp = null;

export const getPublicIp = async () => {
  if (cachedIp) return cachedIp;

  try {
    const response = await fetch("https://ifconfig.me/ip");
    const ip = await response.text();
    cachedIp = ip.trim();
    return cachedIp;
  } catch (err) {
    console.error("Failed to fetch IP:", err);
    return "UNKNOWN";
  }
};
