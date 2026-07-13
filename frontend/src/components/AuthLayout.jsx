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
      <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF7ED] px-4 sm:px-6 py-8 sm:py-10 lg:p-8 relative overflow-hidden">

        {/* MOBILE ONLY block */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-8 relative">

          {/* Soft glow blobs behind mobile content, mirrors desktop mood */}
          <motion.div
            animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 10 }}
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-300/20 blur-[60px] pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 13 }}
            className="absolute -bottom-6 -left-10 w-36 h-36 rounded-full bg-orange-200/25 blur-[50px] pointer-events-none"
          />

          {/* Glass card wrapper — modern app-like container for mobile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgba(154,52,18,0.12)] px-5 py-7 sm:px-8 sm:py-8"
          >

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#9A3412] text-orange-50 text-[10px] sm:text-xs font-semibold tracking-wide px-3 py-1 rounded-full shadow-md"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              AI-Powered Learning
            </motion.div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex justify-center relative mt-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#9A3412] flex items-center justify-center shadow-xl shadow-orange-900/20 ring-4 ring-white/50">
                <span className="text-3xl sm:text-4xl">📚</span>
              </div>
            </motion.div>

            {/* Title — gradient text for a more modern feel */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mt-5 sm:mt-6 text-4xl sm:text-5xl font-black text-center bg-gradient-to-br from-[#EA580C] to-[#7C2D12] bg-clip-text text-transparent relative"
            >
              Archivio
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-2 sm:mt-3 text-center text-gray-600 text-sm sm:text-base leading-relaxed px-2 relative"
            >
              Turn Knowledge Into Mastery.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-2 mt-5 sm:mt-6 relative"
            >
              <span className="px-3 py-2.5 rounded-full bg-white border border-orange-100 shadow-sm text-xs sm:text-sm hover:shadow-md transition-shadow">
                📄 Notes
              </span>
              <span className="px-3 py-2.5 rounded-full bg-white border border-orange-100 shadow-sm text-xs sm:text-sm hover:shadow-md transition-shadow">
                🧠 Flashcards
              </span>
              <span className="px-3 py-2.5 rounded-full bg-white border border-orange-100 shadow-sm text-xs sm:text-sm hover:shadow-md transition-shadow">
                📝 Quiz
              </span>
              <span className="px-3 py-2.5 rounded-full bg-gradient-to-br from-[#EA580C] to-[#9A3412] text-white shadow-sm text-xs sm:text-sm hover:shadow-md transition-shadow">
                💬 Chat
              </span>
            </motion.div>

            {/* Micro trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="mt-5 text-center text-[11px] sm:text-xs uppercase tracking-[0.25em] text-orange-700/70 relative"
            >
              Study • Organize • Learn
            </motion.p>
          </motion.div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;