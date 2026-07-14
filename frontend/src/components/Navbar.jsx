import { useAuthStore } from "../store/authStore";
import { FaUserCircle, FaSignOutAlt, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSidebar } from "./Sidebar"; // adjust this path if Sidebar.jsx lives elsewhere

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { setIsOpen } = useSidebar();

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8 lg:py-5">

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-lg px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-y-3 gap-x-2"
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
          className="absolute -top-10 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-[#C2410C]/10 rounded-full blur-3xl"
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
          className="absolute -bottom-10 left-10 sm:left-20 w-36 sm:w-72 h-36 sm:h-72 bg-black/5 rounded-full blur-3xl"
        />

        {/* Left */}

        <div className="relative z-10 min-w-0 flex-1 sm:flex-none flex items-center gap-3">

          {/* Mobile menu button — now inline, no more overlapping fixed button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="lg:hidden shrink-0 bg-[#C2410C] hover:bg-[#9A3412] text-white p-2.5 rounded-xl shadow-sm transition-colors"
          >
            <FaBars size={16} />
          </motion.button>

          {/* Mobile-only compact avatar with online dot — modern touch, hidden on sm+ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="sm:hidden relative shrink-0"
          >
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#EA580C] to-[#9A3412] flex items-center justify-center shadow-md ring-2 ring-white">
              <FaUserCircle className="text-white text-2xl" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white" />
          </motion.div>

          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate"
            >
              Welcome back
            </motion.h1>

            {/* Mobile-only name line since the full user card is hidden below sm */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="sm:hidden text-xs text-gray-500 truncate"
            >
              {user?.name || "User"} · Learning Workspace
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden sm:block text-gray-500 mt-1 text-sm lg:text-base"
            >
              Continue your learning journey
            </motion.p>
          </div>

        </div>

        {/* Right */}

        <div className="relative z-10 flex items-center gap-2 sm:gap-4 shrink-0">

          {/* User Card */}

          <motion.div
            whileHover={{
              y: -2,
              scale: 1.02,
            }}
            className="hidden sm:flex items-center gap-3 bg-[#F8F8F8] border border-gray-200 px-4 lg:px-5 h-[52px] lg:h-[56px] rounded-2xl"
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
                className="text-[#C2410C] text-3xl lg:text-[34px]"
              />
            </motion.div>

            <div>
              <p className="font-semibold text-sm lg:text-base text-gray-900 leading-none">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Learning Workspace
              </p>
            </div>

          </motion.div>

          {/* Logout — icon-only pill on mobile, full text button from sm+ */}

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={logout}
            aria-label="Logout"
            className="h-[44px] sm:h-[56px] w-[44px] sm:w-auto px-0 sm:px-6 rounded-2xl bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 text-sm sm:text-base shrink-0 flex items-center justify-center gap-2"
          >
            <FaSignOutAlt className="text-base sm:hidden" />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>

        </div>

      </motion.div>

    </div>
  );
};

export default Navbar;