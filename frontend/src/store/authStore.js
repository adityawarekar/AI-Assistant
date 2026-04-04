import { create } from "zustand";
import API from "../services/api";

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,

    register: async (data) => {
      const res = await API.post("/auth/register", data);
      return res.data;
    },

    login: async (data) => {
        const res = await API.post("/auth/login", data);

        localStorage.setItem("token", res.data.token);

        set({
            user: res.data.user,
            token: res.data.token,
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ user:null, token: null });
    },
}))

