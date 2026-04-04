import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form);
    alert("Login success");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Email"
          className="p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-red-500 px-4 py-2">Login</button>
      </form>
    </div>
  );
};

export default Login;