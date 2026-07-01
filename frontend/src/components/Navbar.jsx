import { useAuthStore } from "../store/authStore";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="px-8 py-5">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg px-8 py-5 flex items-center justify-between"
      >

        {/* Background Glow */}

        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          className="absolute -top-10 right-0 w-64 h-64 bg-[#C2410C]/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="absolute -bottom-10 left-20 w-72 h-72 bg-black/5 rounded-full blur-3xl"
        />

        {/* Left */}

        <div className="relative z-10">

          <motion.h1
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            Welcome back
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 mt-1"
          >
            Continue your learning journey
          </motion.p>

        </div>

        {/* Right */}

        <div className="relative z-10 flex items-center gap-4">

          {/* User Card */}

          <motion.div
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            className="flex items-center gap-3 bg-[#F8F8F8] border border-gray-200 px-5 h-[56px] rounded-2xl"
          >

            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <FaUserCircle
                size={34}
                className="text-[#C2410C]"
              />
            </motion.div>

            <div>
              <p className="font-semibold text-gray-900 leading-none">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Learning Workspace
              </p>
            </div>

          </motion.div>

          {/* Logout */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={logout}
            className="h-[56px] px-6 rounded-2xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            Logout
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
};

export default Navbar;