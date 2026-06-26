import StatCard from "../components/StatCard";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import {
  FaFileAlt,
  FaBookOpen,
  FaBrain,
  FaComments,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    averageProgress: 0,
  });

  const [recentPdfs, setRecentPdfs] = useState([]);

  const fetchStats = async () => {
    try {
      const res = await API.get(
        "/pdf/dashboard/stats"
      );

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

  return (
    <Layout>
      <div className="space-y-8">

        {/* Hero Section */}

        <div className="bg-[#E9D66B] rounded-3xl p-8 shadow-md">
          <h1 className="text-5xl font-bold text-black">
            Archivio
          </h1>

          <p className="mt-3 text-lg text-gray-700">
            Where Documents Become Knowledge.
          </p>

          <p className="mt-2 text-gray-600">
            Upload PDFs, generate notes,
            flashcards, quizzes and study
            smarter from one place.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            title="Documents"
            value={stats.totalDocuments}
          />

          <StatCard
            title="Progress"
            value={`${stats.averageProgress}%`}
          />

          <StatCard
            title="Learning Tools"
            value="10+"
          />

          <StatCard
            title="Features"
            value="12"
          />
        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent PDFs */}

          <div className="lg:col-span-2 bg-[#FFFDF5] rounded-3xl p-6 shadow-md">

            <h2 className="text-2xl font-bold mb-6">
              📚 Recent Documents
            </h2>

            {recentPdfs.length === 0 ? (
              <p>No PDFs uploaded yet.</p>
            ) : (
              recentPdfs.map((pdf) => (
                <div
                  key={pdf._id}
                  className="mb-5 bg-[#F5F3E7] p-4 rounded-2xl"
                >
                  <div className="flex justify-between mb-2">
                    <h3 className="font-semibold">
                      📄 {pdf.title}
                    </h3>

                    <span>
                      {pdf.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-[#E9D66B] h-3 rounded-full"
                      style={{
                        width: `${pdf.progress}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}

          <div className="bg-[#FFFDF5] rounded-3xl p-6 shadow-md">

            <h2 className="text-2xl font-bold mb-6">
              ⚡ Quick Actions
            </h2>

            <div className="space-y-4">

              <button
                className="w-full bg-gray-50 hover:bg-[#E9D66B] border border-gray-200
      hover:border-[#E9D66B] p-4 rounded-2xl flex items-center gap-3
      transition-all duration-300 hover:scale-[1.02]"
              >
                <FaBookOpen className="text-xl" />
                <span className="font-semibold">
                  Generate Notes
                </span>
              </button>

              <button
                className="w-full bg-gray-50 hover:bg-[#E9D66B] border border-gray-200
      hover:border-[#E9D66B] p-4 rounded-2xl flex items-center gap-3
      transition-all duration-300 hover:scale-[1.02]"
              >
                <FaBrain className="text-xl" />
                <span className="font-semibold">
                  Generate Quiz
                </span>
              </button>

              <button
                className="w-full bg-gray-50 hover:bg-[#E9D66B] border border-gray-200
      hover:border-[#E9D66B] p-4 rounded-2xl flex items-center gap-3
      transition-all duration-300 hover:scale-[1.02]"
              >
                <FaFileAlt className="text-xl" />
                <span className="font-semibold">
                  Flashcards
                </span>
              </button>

              <button
                className="w-full bg-gray-50 hover:bg-[#E9D66B] border border-gray-200
      hover:border-[#E9D66B] p-4 rounded-2xl flex items-center gap-3
      transition-all duration-300 hover:scale-[1.02]"
              >
                <FaComments className="text-xl" />
                <span className="font-semibold">
                  Chat With PDF
                </span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;