import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

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
      toast.error("Please select a PDF");
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

      toast.error(
        error.response?.data?.error ||
        "Failed to generate important topics."
      );
    } finally {
      setLoading(false);
    }
  };
  const downloadTopics = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Archivio - Important Topics", 15, 20);

    doc.setDrawColor(194, 65, 12);
    doc.line(15, 25, 195, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(topics, 180);

    doc.text(lines, 15, 35);

    doc.save("Archivio-Important-Topics.pdf");
  };

  const copyTopics = async () => {
    try {
      await navigator.clipboard.writeText(topics);
      toast.success("Topics copied successfully!");
    } catch (error) {
      toast.error("Failed to copy topics.");
    }
  };

  return (
    <Layout>
      <div className="space-y-5 sm:space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Important Topics
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
            Discover the most exam-relevant topics from your PDF.
          </p>
        </div>

        {/* Controls */}

        <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-3xl shadow-md">

          <select
            value={selectedPdf}
            onChange={(e) =>
              setSelectedPdf(e.target.value)
            }
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 mb-4 text-sm sm:text-base"
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
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition
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
          <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-[#C2410C] font-semibold text-sm sm:text-base">

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
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 lg:p-12"
          >
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-16 -left-10 w-44 h-44 sm:w-80 sm:h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                Topic Analysis
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4">
                Focus on what matters most
              </h2>

              <p className="text-gray-500 mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Identify the most important concepts, chapters,
                definitions and exam-focused topics from your
                documents for efficient revision.
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Key Concepts</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Exam Focused</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Quick Revision</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Topic Analysis</span>
              </div>

            </div>

          </motion.div>
        )}
        {topics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FFFDF5] p-4 sm:p-8 rounded-3xl shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-2xl font-bold">
                📌 Important Topics
              </h2>

              <div className="flex gap-2 sm:gap-3 shrink-0">
                <button
                  onClick={copyTopics}
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition text-sm sm:text-base"
                >
                  Copy
                </button>

                <button
                  onClick={downloadTopics}
                  disabled={loading}
                  className="flex-1 sm:flex-none bg-[#C2410C] text-white px-4 py-2 rounded-xl hover:bg-[#9A3412] transition text-sm sm:text-base"
                >
                  Download PDF
                </button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap break-words text-sm sm:text-base leading-7 sm:leading-8 text-gray-700 overflow-x-auto">
              {topics}
            </pre>
          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default ImportantTopics;