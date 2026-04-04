import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const { register } = useAuthStore();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    alert("Registered successfully");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="p-2 bg-gray-800"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="bg-red-500 px-4 py-2">Register</button>
      </form>
    </div>
  );
};

export default Register;