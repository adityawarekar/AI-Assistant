import { create } from "zustand";
import API from "../services/api";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null, 
  token: localStorage.getItem("token") || null,

  register: async (data) => {
  const res = await API.post("/auth/register", data);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  set({
    user: res.data.user,
    token: res.data.token,
  });

  return res.data;
},

  login: async (data) => {
    const res = await API.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user)); 

    set({
      user: res.data.user,
      token: res.data.token,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    set({ user: null, token: null });
  },
}));