import { motion } from "framer-motion";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F5F3E7] flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-[#E9D66B] p-12 flex-col justify-center relative overflow-hidden">

        <motion.div
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
          className="absolute top-20 right-20 w-40 h-40 rounded-full bg-white/30"
        />

        <motion.div
          animate={{
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
          }}
          className="absolute bottom-20 left-20 w-28 h-28 rounded-full bg-white/20"
        />

        <h1 className="text-6xl font-bold">
          Archivio
        </h1>

        <p className="mt-6 text-xl max-w-md">
          Where Documents Become Knowledge.
        </p>

        <p className="mt-4 text-gray-700 max-w-lg">
          Upload PDFs, generate notes,
          flashcards, quizzes and study
          smarter from one workspace.
        </p>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

    </div>
  );
};

export default AuthLayout;