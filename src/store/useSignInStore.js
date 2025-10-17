import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSignInStore = create(
  persist(
    (set, get) => ({
      customerId: "",
      
      // Save login session (encoded)
      setCustomerId: (id) => set({ customerId: btoa(id) }),

      // Decode and return customerId
      getCustomerId: () => {
        const encoded = get().customerId;
        return encoded ? Number(atob(encoded)) : null;
      },

      // 🔹 Logout function (clear store + localStorage)
      logout: () => {
        localStorage.removeItem("customerId"); // remove persisted key
        localStorage.removeItem("authToken");  // optional: clear token
        set({ customerId: "" }); // reset store
      },
    }),
    {
      name: "customerId", // key name for persistence
    }
  )
);
