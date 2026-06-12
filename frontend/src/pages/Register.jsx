import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(form);

    alert("Registered Successfully");

    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        <div className="bg-[#FFFDF5] rounded-3xl shadow-xl p-8">

          <h1 className="text-4xl font-bold text-black">
            Create Account 🚀
          </h1>

          <p className="text-gray-500 mt-2 mb-8">
            Start your learning journey.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-4 rounded-xl border border-gray-200 outline-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />

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
              Create Account
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-semibold text-black"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </AuthLayout>
  );
};

export default Register;