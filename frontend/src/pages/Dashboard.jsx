import StatCard from "../components/StatCard";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    totalFlashcards: 0,
    totalInterviewQuestions: 0,
    totalStudyPlans: 0,
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
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-4 gap-4">
          <StatCard
            title="Documents"
            value={stats.totalDocuments}
          />

          <StatCard
            title="Flashcards"
            value={stats.totalFlashcards}
          />

          <StatCard
            title="Interview Questions"
            value={stats.totalInterviewQuestions}
          />

          <StatCard
            title="Study Plans"
            value={stats.totalStudyPlans}
          />
        </div>

        <div className="mt-8 bg-slate-800 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Recent PDFs
          </h2>

          {recentPdfs.length === 0 ? (
            <p>No PDFs uploaded yet</p>
          ) : (
            recentPdfs.map((pdf) => (
              <div
                key={pdf._id}
                className="bg-slate-700 p-3 rounded mb-3"
              >
                <h3 className="font-semibold">
                  📄 {pdf.title}
                </h3>
                <p className="text-sm mt-2">
                  Progress: {pdf.progress}%
                </p>

                <div className="w-full bg-slate-900 rounded-full h-3 mt-2">
                  <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{
                    width: `${pdf.progress}%`,
                  }}
                  ></div>
              </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;