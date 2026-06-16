import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Hero Section */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-10"
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
            className="absolute -top-10 -right-10 w-72 h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
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
            className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/5 rounded-full blur-3xl"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">

            <motion.div
              whileHover={{
                scale: 1.05,
              }}
              className="w-32 h-32 rounded-full bg-[#E9D66B] flex items-center justify-center text-5xl font-bold shadow-lg"
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </motion.div>

            <div>

              <p className="uppercase tracking-[0.2em] text-gray-400 text-sm">
                Student Profile
              </p>

              <h1 className="text-5xl font-bold mt-2">
                {user?.name || "User"}
              </h1>

              <p className="text-gray-500 mt-3 text-lg">
                Manage your learning profile and account information.
              </p>

            </div>

          </div>

        </motion.div>

        {/* Info Cards */}

        <div className="grid md:grid-cols-2 gap-6">

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg"
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">
              Full Name
            </p>

            <h2 className="text-2xl font-bold">
              {user?.name}
            </h2>
          </motion.div>

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-lg"
          >
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-3">
              Email Address
            </p>

            <h2 className="text-2xl font-bold break-all">
              {user?.email}
            </h2>
          </motion.div>

        </div>

        {/* Learning Overview */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
          }}
          className="bg-white rounded-3xl border border-gray-100 shadow-lg p-8"
        >

          <h2 className="text-3xl font-bold mb-4">
            Learning Workspace
          </h2>

          <p className="text-gray-500 leading-relaxed text-lg">
            Your profile is connected to all uploaded documents,
            flashcards, quizzes, notes, revision materials,
            practice sheets and study resources generated
            throughout your learning journey.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">

            <span className="px-5 py-3 rounded-2xl bg-[#F5F3E7]">
              Flashcards
            </span>

            <span className="px-5 py-3 rounded-2xl bg-[#F5F3E7]">
              Notes
            </span>

            <span className="px-5 py-3 rounded-2xl bg-[#F5F3E7]">
              Quizzes
            </span>

            <span className="px-5 py-3 rounded-2xl bg-[#F5F3E7]">
              Interview Prep
            </span>

            <span className="px-5 py-3 rounded-2xl bg-[#F5F3E7]">
              Revision Notes
            </span>

          </div>

        </motion.div>

      </div>
    </Layout>
  );
};

export default Profile;