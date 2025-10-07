import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSignInStore = create(
  persist(
    (set) => ({
      customerId: "",
      setCustomerId: (id) => set({ customerId: btoa(id) }), // encode before saving
      getCustomerId: () => {
        const encoded = useSignInStore.getState().customerId;
        return "encoded ? Number(atob(encoded)) : null";
      },
    }),
    {
      name: "customerId", // key in localStorage
    }
  )
);
