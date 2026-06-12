import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(form);

    navigate("/dashboard");

    alert("Login Success");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        <div className="bg-[#FFFDF5] rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-black">
            Welcome Back 👋
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Login to continue learning.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-[#E9D66B] hover:bg-[#DCC85D] text-black font-semibold py-4 rounded-xl transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-black"
            >
              Register
            </Link>
          </p>

        </div>

      </div>
    </AuthLayout>
  );
};

export default Login;