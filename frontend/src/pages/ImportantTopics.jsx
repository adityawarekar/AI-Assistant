import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const ImportantTopics = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [topics, setTopics] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPdfs = async () => {
    try {
      const res = await API.get("/pdf");
      setPdfs(res.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const generateTopics = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/important-topics/${selectedPdf}`
      );

      setTopics(res.data.topics);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      alert(
        error.response?.data?.error ||
        "Failed to generate important topics."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyTopics = () => {
    navigator.clipboard.writeText(topics);

    alert("Topics copied!");
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Important Topics
          </h1>

          <p className="text-gray-500 mt-2">
            Discover the most exam-relevant topics from your PDF.
          </p>
        </div>

        {/* Controls */}

        <div className="bg-[#FFFDF5] p-6 rounded-3xl shadow-md">

          <select
            value={selectedPdf}
            onChange={(e) =>
              setSelectedPdf(e.target.value)
            }
            className="w-full p-4 rounded-xl border border-gray-200 mb-4"
          >
            <option value="">
              Select PDF
            </option>

            {pdfs.map((pdf) => (
              <option
                key={pdf._id}
                value={pdf._id}
              >
                {pdf.title}
              </option>
            ))}
          </select>

          <button
            onClick={generateTopics}
            disabled={!selectedPdf || loading}
            className={`px-6 py-3 rounded-xl font-semibold transition
    ${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Topics"}
          </button>

        </div>

        {/* Loader */}

        {loading && (
          <div className="bg-[#FFFDF5] p-4 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-[#C2410C] font-semibold">

              <span className="animate-bounce text-[#EA580C]">
                ●
              </span>

              <span className="animate-bounce delay-100 text-[#EA580C]">
                ●
              </span>

              <span className="animate-bounce delay-200 text-[#EA580C]">
                ●
              </span>

              Archivio is analyzing topics...
            </div>

          </div>
        )}

        {/* Result */}

        {!topics && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-12"
          >
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-72 h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Topic Analysis
              </p>

              <h2 className="text-4xl font-bold mt-4">
                Focus on what matters most
              </h2>

              <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                Identify the most important concepts, chapters,
                definitions and exam-focused topics from your
                documents for efficient revision.
              </p>

              <div className="flex flex-wrap gap-8 mt-10 text-sm text-gray-600">
                <span>Key Concepts</span>
                <span>Exam Focused</span>
                <span>Quick Revision</span>
                <span>Topic Analysis</span>
              </div>

            </div>

          </motion.div>
        )}
        {topics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                📌 Important Topics
              </h2>

              <button
                onClick={copyTopics}
                className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
              >
                Copy
              </button>
            </div>

            <pre className="whitespace-pre-wrap leading-8 text-gray-700">
              {topics}
            </pre>
          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default ImportantTopics;