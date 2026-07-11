import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Login failed"
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

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E9D66B]/30 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-black/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">

            {/* Header */}

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
                Welcome Back
              </h1>

              <p className="text-gray-500 mt-2">
                Continue your learning journey with Archivio.
              </p>

            </motion.div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:border-[#C2410C] focus:ring-4 focus:ring-[#C2410C]/20 outline-none transition-all"
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
                className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:border-[#C2410C] focus:ring-4 focus:ring-[#C2410C]/20 outline-none transition-all"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="w-full bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() =>
                  window.location.href =
                  "https://api.archivio.tech/api/auth/google"
                }
                className="w-full bg-white border border-[#FED7AA] py-4 rounded-2xl font-medium hover:bg-[#FFF7ED] hover:border-[#C2410C] transition-all duration-300"
              >
                Continue with Google
              </button>

            </form>

            {/* Footer */}

            <p className="text-center mt-6 text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#C2410C] hover:text-[#9A3412] transition"
              >
                Register
              </Link>
            </p>

            <p className="text-center text-xs text-gray-400 mt-6">
              Secure login powered by Archivio
            </p>

          </div>

        </motion.div>

      </div>
    </AuthLayout>
  );
};

export default Login;