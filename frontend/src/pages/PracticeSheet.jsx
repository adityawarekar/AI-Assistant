import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const PracticeSheet = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [practiceSheet, setPracticeSheet] = useState("");
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

  const generatePracticeSheet = async () => {
    if (!selectedPdf) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/practice-sheet/${selectedPdf}`
      );

      setPracticeSheet(
        res.data.practiceSheet
      );
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      toast.error(
        error.response?.data?.error ||
        "Failed to generate practice sheet."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyPracticeSheet = async () => {
    try {
      await navigator.clipboard.writeText(practiceSheet);
      toast.success("Practice Sheet copied successfully!");
    } catch (error) {
      toast.error("Failed to copy Practice Sheet.");
    }
  };

  const downloadPracticeSheet = () => {
    const blob = new Blob(
      [practiceSheet],
      { type: "text/plain" }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "Archivio-Practice-Sheet.txt";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="space-y-5 sm:space-y-6">

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
          Practice Sheet
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
          Generate targeted practice questions from your PDF.
        </p>

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
            onClick={generatePracticeSheet}
            disabled={!selectedPdf || loading}
            className={`w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base
    ${!selectedPdf || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Practice Sheet"}
          </button>
        </div>

        {loading && (
          <div className="text-[#C2410C] font-semibold text-sm sm:text-base flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-orange-200 border-t-[#C2410C] rounded-full animate-spin" />
            Generating Practice Sheet...
          </div>
        )}

        {!practiceSheet && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-5 sm:p-8 lg:p-12"
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
                Practice Workspace
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4">
                Strengthen your understanding
              </h2>

              <p className="text-gray-500 mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Create practice sheets from your study
                material and reinforce learning through
                structured questions and problem solving.
              </p>

              <div className="flex flex-wrap gap-2.5 sm:gap-8 mt-6 sm:mt-10 text-xs sm:text-sm text-gray-600">
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Practice Questions</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Self Assessment</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Problem Solving</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Exam Ready</span>
              </div>

            </div>

          </motion.div>
        )}

        {practiceSheet && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-[#FFFDF5] p-4 sm:p-8 rounded-3xl shadow-md"
          >
            <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-6">

              <button
                onClick={copyPracticeSheet}
                className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:scale-105 transition"
              >
                Copy
              </button>

              <button
                onClick={downloadPracticeSheet}
                className="flex-1 sm:flex-none bg-[#C2410C] text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-[#9A3412] hover:scale-105 transition"
              >
                Download
              </button>

            </div>

            <pre className="whitespace-pre-wrap leading-7 sm:leading-8 text-gray-700 text-sm sm:text-base break-words">
              {practiceSheet}
            </pre>

          </motion.div>
        )}
        2
      </div>
    </Layout>
  );
};

export default PracticeSheet;