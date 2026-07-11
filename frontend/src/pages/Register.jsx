import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Register = () => {
  const { register, token } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
  if (token) {
    navigate("/dashboard");
  }
}, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      toast.success("Account created successfully!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl border border-white/50 p-8"
        >
          {/* Background Glow */}

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C2410C]/20 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold text-black">
                Create Account
              </h1>

              <p className="text-gray-500 mt-2">
                Start your learning journey with Archivio.
              </p>
            </motion.div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:border-[#C2410C] focus:ring-4 focus:ring-[#C2410C]/20 outline-none transition-all"
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
                className="w-full p-4 rounded-2xl border hover:scale-[1.02] border-gray-200 outline-none"
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
                className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-200"></div>

                <span className="px-4 text-sm text-gray-400">
                  OR
                </span>

                <div className="flex-1 border-t border-gray-200"></div>
              </div>

            </form>

            <button
              type="button"
              onClick={() =>
              (window.location.href =
                "https://api.archivio.tech/api/auth/google")
              }
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <p className="text-center mt-6 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-[#C2410C] hover:text-[#9A3412] transition"
              >
                Login
              </Link>
            </p>
            <p className="text-center text-xs text-gray-400 mt-6">
              Secure authentication powered by Archivio
            </p>

          </div>
        </motion.div>
      </div>

    </AuthLayout>
  );
};

export default Register;