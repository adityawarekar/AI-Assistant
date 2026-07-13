import StatCard from "../components/StatCard";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaBookOpen,
  FaBrain,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    averageProgress: 0,
  });

  const [recentPdfs, setRecentPdfs] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await API.get("/pdf/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentPdfs = async () => {
    try {
      const res = await API.get("/pdf/recent");
      setRecentPdfs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchRecentPdfs();
  }, []);

  const quickActions = [
    { icon: FaBookOpen, label: "Generate Notes", color: "from-[#EA580C] to-[#C2410C]" },
    { icon: FaBrain, label: "Generate Quiz", color: "from-[#9A3412] to-[#7C2D12]" },
    { icon: FaFileAlt, label: "Flashcards", color: "from-[#C2410C] to-[#9A3412]" },
    { icon: FaComments, label: "Chat With PDF", color: "from-[#EA580C] to-[#9A3412]" },
  ];

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#9A3412] via-[#C2410C] to-[#EA580C] rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl"
        >
          {/* Decorative glow blobs */}
          <motion.div
            animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute -top-8 -right-8 w-40 h-40 sm:w-56 sm:h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 13, repeat: Infinity }}
            className="absolute -bottom-10 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-black/10 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Archivio
            </h1>

            <p className="mt-3 text-sm sm:text-base lg:text-lg text-orange-100 font-medium">
              Where Documents Become Knowledge.
            </p>

            <p className="mt-2 text-sm sm:text-base text-orange-50 leading-relaxed max-w-xl">
              Upload PDFs, generate notes, flashcards, quizzes, and study smarter from one place.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard title="Documents" value={stats.totalDocuments} />
          <StatCard title="Progress" value={`${stats.averageProgress}%`} />
          <StatCard title="Learning Tools" value="10+" />
          <StatCard title="Features" value="12" />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

          {/* Recent PDFs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-[#FFFDF5] rounded-3xl p-4 sm:p-6 shadow-md"
          >
            <h2 className="text-lg sm:text-2xl font-bold mb-5 sm:mb-6 flex items-center gap-2">
              <span>📚</span> Recent Documents
            </h2>

            {recentPdfs.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-10 sm:py-12">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-orange-50 flex items-center justify-center mb-3">
                  <FaFileAlt className="text-2xl text-[#EA580C]" />
                </div>
                <p className="text-gray-500 text-sm sm:text-base">
                  No PDFs uploaded yet.
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {recentPdfs.map((pdf, i) => (
                  <motion.div
                    key={pdf._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="bg-[#FAFAF9] hover:bg-white border border-transparent hover:border-orange-100 hover:shadow-sm p-3 sm:p-4 rounded-2xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon badge */}
                      <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#EA580C] to-[#9A3412] flex items-center justify-center">
                        <FaFileAlt className="text-white text-sm sm:text-base" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <h3 className="font-semibold text-sm sm:text-base truncate min-w-0">
                            {pdf.title}
                          </h3>
                          <span className="shrink-0 text-xs sm:text-sm font-semibold text-[#C2410C] bg-orange-50 px-2 py-0.5 rounded-full">
                            {pdf.progress}%
                          </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pdf.progress}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="bg-gradient-to-r from-[#EA580C] to-[#C2410C] h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-3xl p-4 sm:p-6 shadow-md"
          >
            <h2 className="text-lg sm:text-2xl font-bold mb-5 sm:mb-6">
              Quick Actions
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {quickActions.map(({ icon: Icon, label, color }, i) => (
                <motion.button
                  key={label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-50 hover:bg-[#FFF7ED] border border-gray-200 hover:border-[#EA580C] p-3 sm:p-4 rounded-2xl flex items-center gap-3 transition-all duration-300 group"
                >
                  <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon className="text-white text-sm sm:text-base" />
                  </div>

                  <span className="font-semibold text-sm sm:text-base text-gray-700 group-hover:text-[#C2410C] flex-1 text-left min-w-0 truncate">
                    {label}
                  </span>

                  <FaArrowRight className="text-gray-300 group-hover:text-[#EA580C] group-hover:translate-x-0.5 transition-all duration-300 text-sm shrink-0" />
                </motion.button>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;