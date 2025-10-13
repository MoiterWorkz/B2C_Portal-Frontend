// src/utils/authManager.js
export const AUTH_TOKEN_KEY = "accessToken";

// ✅ Save token in localStorage + Swagger
export const saveAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);

  // If Swagger UI exists, auto-authorize
  if (window.ui && typeof window.ui.preauthorizeApiKey === "function") {
    window.ui.preauthorizeApiKey("Bearer", token);
    console.log("✅ Swagger auto-authorized with token");
  }
};

// ✅ Load token from localStorage and reapply (e.g. after refresh)
export const restoreSwaggerAuth = () => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token && window.ui && typeof window.ui.preauthorizeApiKey === "function") {
    window.ui.preauthorizeApiKey("Bearer", token);
    console.log("🔄 Swagger auth restored");
  }
};

// ✅ Clear token from everywhere
export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);

  // De-authorize Swagger if loaded
  if (window.ui && typeof window.ui.preauthorizeApiKey === "function") {
    try {
      window.ui.authActions.logout(); // available in Swagger-UI 4+
      console.log("🚪 Swagger de-authorized");
    } catch {
      console.log("⚠️ Could not auto-logout Swagger UI");
    }
  }
};
