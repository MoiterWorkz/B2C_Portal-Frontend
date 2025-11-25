import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchPayee } from "../services/service";

export const useSignInStore = create(
  persist(
    (set, get) => ({
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
        localStorage.removeItem("authToken"); // optional: clear token
        set({ customerId: "" }); // reset store
      },
    }),
    {
      name: "customerId", // key name for persistence
    }
  )
);

export const usePaymentStore = create((set) => ({
  paymentFormData: {},
  setPaymentFormData: (data) =>
    set((prev) => ({ paymentFormData: { ...prev.paymentFormData, ...data } })),

  paymentFormDataErr: {},
  setPaymentFormDataErr: (data) =>
    set((prev) => ({
      paymentFormDataErr: { ...prev.paymentFormDataErr, ...data },
    })),
}));

export const useZustandStore = create((set) => ({
  payeeList: [],
  fetchPayeeList: async () => {
    const customerId = useSignInStore.getState().getCustomerId();
    const res = await fetchPayee(customerId);
    set({ payeeList: res });
  },
}));
