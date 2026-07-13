import { useState, useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const Login = () => {
  const { login, token } = useAuthStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authToken = token || localStorage.getItem("token");

    if (authToken) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await login(form);

      toast.success("Welcome back!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md px-4">

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
          className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-[32px] shadow-xl border border-white/50 p-6 sm:p-8"
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

              <h1 className="text-3xl sm:text-4xl font-bold text-black">
                Welcome Back
              </h1>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Continue your learning journey with Archivio.
              </p>

            </motion.div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-5"
            >

              <input
                type="email"
                placeholder="Email Address"
                required
                disabled={loading}
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-gray-200 bg-white focus:border-[#C2410C] focus:ring-4 focus:ring-[#C2410C]/20 outline-none transition-all disabled:opacity-60"
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
                required
                disabled={loading}
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-gray-200 bg-white focus:border-[#C2410C] focus:ring-4 focus:ring-[#C2410C]/20 outline-none transition-all disabled:opacity-60"
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed text-white font-semibold py-3.5 sm:py-4 rounded-2xl hover:scale-[1.02] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading && (
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                )}
                {loading ? "Logging in..." : "Login"}
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                (window.location.href =
                  "https://api.archivio.tech/api/auth/google")
                }
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-3.5 sm:py-4 rounded-xl font-medium hover:bg-gray-50 disabled:opacity-60 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm sm:text-base">
                  Continue with Google
                </span>
              </button>

            </form>

            {/* Footer */}

            <p className="text-center mt-6 text-sm sm:text-base text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#C2410C] hover:text-[#9A3412] transition"
              >
                Register
              </Link>
            </p>

            <p className="text-center text-[11px] sm:text-xs text-gray-400 mt-6">
              Secure login powered by Archivio
            </p>

          </div>

        </motion.div>

      </div>
    </AuthLayout>
  );
};

export default Login;