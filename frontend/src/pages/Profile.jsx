import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-5 sm:space-y-8">



        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-5 sm:p-8 lg:p-10"
        >

          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
            }}
            className="absolute -top-10 -right-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
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
            className="absolute -bottom-16 -left-10 w-44 h-44 sm:w-80 sm:h-80 bg-black/5 rounded-full blur-3xl"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left gap-5 sm:gap-8">

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 shrink-0 rounded-full bg-[#C2410C] flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-white shadow-lg"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </motion.div>

            <div className="min-w-0">

              <p className="uppercase tracking-[0.2em] text-gray-400 text-xs sm:text-sm">
                Student Profile
              </p>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mt-2 break-words">
                {user?.name || "User"}
              </h1>

              <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
                Manage your learning profile and account information.
              </p>

            </div>

          </div>

        </motion.div>



        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-lg"
          >
            <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2 sm:mb-3">
              Full Name
            </p>

            <h2 className="text-lg sm:text-2xl font-bold break-words">
              {user?.name}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-5 sm:p-8 rounded-3xl border border-gray-100 shadow-lg"
          >
            <p className="text-xs sm:text-sm uppercase tracking-wider text-gray-400 mb-2 sm:mb-3">
              Email Address
            </p>

            <h2 className="text-lg sm:text-2xl font-bold break-all">
              {user?.email}
            </h2>
          </motion.div>

        </div>



        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
          }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-5 sm:p-8"
        >

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            Learning Workspace
          </h2>

          <p className="text-gray-500 leading-relaxed text-sm sm:text-base lg:text-lg">
            Your profile is connected to all uploaded documents,
            flashcards, quizzes, notes, revision materials,
            practice sheets and study resources generated
            throughout your learning journey.
          </p>

          <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-5 sm:mt-8">

            <span className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#F5F3E7] text-sm sm:text-base">
              Flashcards
            </span>

            <span className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#F5F3E7] text-sm sm:text-base">
              Notes
            </span>

            <span className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#F5F3E7] text-sm sm:text-base">
              Quizzes
            </span>

            <span className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#F5F3E7] text-sm sm:text-base">
              Interview Prep
            </span>

            <span className="px-3.5 sm:px-5 py-2 sm:py-3 rounded-2xl bg-[#F5F3E7] text-sm sm:text-base">
              Revision Notes
            </span>

          </div>

        </motion.div>

      </div>
    </Layout>
  );
};

export default Profile;