import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#FFF7ED] flex flex-col lg:flex-row overflow-hidden">

      {/* Left Section */}

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

      <div className="flex-1 flex flex-col items-center justify-center bg-[#FFF7ED] px-4 py-8 sm:px-6 lg:p-8">

        <div className="lg:hidden text-center mb-8">
          <h1 className="text-4xl font-black text-[#C2410C]">
            Archivio
          </h1>

          <p className="mt-2 text-gray-600">
            Turn Knowledge Into Mastery.
          </p>
        </div>
        {children}

      </div>

    </div>
  );
};

export default AuthLayout;