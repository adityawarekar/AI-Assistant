import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col lg:flex-row overflow-hidden">

      {/* Left Section — DESKTOP ONLY, unchanged */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-[#7C2D12] via-[#9A3412] to-[#EA580C] px-12 xl:px-20 flex-col justify-center">

        {/* Animated Glow */}
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-orange-200/20 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
          className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-orange-100/20 blur-[100px]"
        />

        {/* Decorative Circle */}
        <div className="absolute -right-32 -bottom-32 w-[420px] h-[420px] rounded-full border border-white/10"></div>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl xl:text-8xl font-black tracking-tight text-white">
            Archivio
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-2xl xl:text-3xl font-semibold text-orange-100 max-w-xl"
        >
          Turn Knowledge Into Mastery.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-base xl:text-lg text-orange-50/90 max-w-xl leading-relaxed"
        >
          Transform documents into notes, flashcards, quizzes,
          study plans, and structured learning material from
          one intelligent workspace built for every learner.
        </motion.p>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-sm uppercase tracking-[0.35em] text-orange-100"
        >
          Study • Organize • Learn
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF7ED] px-4 sm:px-6 py-6 sm:py-10 lg:p-8 relative overflow-y-auto">

        {/* Ambient Background Glows (Visible on all screen sizes, floats behind content) */}
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut"
          }}
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-orange-300/15 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 40, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut"
          }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-orange-200/20 blur-[100px] pointer-events-none"
        />

        {/* MOBILE ONLY Header — Lightweight, modern, and space-saving */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-6 flex flex-col items-center text-center z-10">
          {/* Logo Icon with subtle breathing animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#9A3412] flex items-center justify-center shadow-lg shadow-orange-950/20 ring-4 ring-white"
          >
            <span className="text-2xl animate-bounce" style={{ animationDuration: '3s' }}>📚</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mt-3 text-3xl font-black tracking-tight bg-gradient-to-r from-[#EA580C] via-[#C2410C] to-[#7C2D12] bg-clip-text text-transparent"
          >
            Archivio
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-1 text-sm font-medium text-gray-500"
          >
            Turn Knowledge Into Mastery
          </motion.p>

          {/* Clean, compact Feature Pills */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-1.5 mt-4 text-xs font-semibold text-orange-900"
          >
            <span className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-orange-100/50 shadow-sm">
              📄 Notes
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-orange-100/50 shadow-sm">
              🧠 Flashcards
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-orange-100/50 shadow-sm">
              📝 Quiz
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#EA580C] to-[#9A3412] text-white shadow-sm">
              💬 Chat
            </span>
          </motion.div>
        </div>

        {/* Children Form Card Wrapper */}
        <div className="w-full max-w-md mx-auto z-10 flex justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;