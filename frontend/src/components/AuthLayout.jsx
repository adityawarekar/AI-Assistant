import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F3E7] flex overflow-hidden">

  

      <div className="hidden lg:flex w-1/2 relative bg-[#E9D66B] overflow-hidden px-20 flex-col justify-center">

        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -60, 0] }}
          transition={{ repeat: Infinity, duration: 12 }}
          className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-white/20 blur-[120px]"
        />

        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 15 }}
          className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-white/20 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-8xl font-black tracking-tight text-gray-900">
            Archivio
          </h1>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 text-3xl font-semibold text-gray-800 max-w-xl"
        >
          Knowledge organized beautifully.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-6 text-lg text-gray-700 max-w-xl leading-relaxed"
        >
          Transform documents into notes, flashcards,
          quizzes and structured study material from
          one elegant workspace designed for learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10 text-sm uppercase tracking-[0.3em] text-gray-700"
        >
          Study • Organize • Learn
        </motion.div>

      </div>

      

      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;
