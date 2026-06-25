import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const InterviewQuestions = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [questions, setQuestions] = useState([]);
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

  const generateQuestions = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/interview/${selectedPdf}`
      );

      setQuestions(res.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      alert(
        error.response?.data?.error ||
        "Failed to generate interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            Interview Questions
          </h1>

          <p className="text-gray-500 mt-2">
            Generate interview questions from PDFs
          </p>
        </div>

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
            onClick={generateQuestions}
            disabled={!selectedPdf || loading}
            className={`px-6 py-3 rounded-xl font-semibold transition
    ${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#E9D66B] text-black hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>

        </div>

        {loading && (
          <div className="text-yellow-600 font-semibold">
            Archivio is generating questions...
          </div>
        )}
        {questions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-12"
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

            <div className="relative z-10 max-w-3xl">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Interview Workspace
              </p>

              <h2 className="text-4xl font-bold mt-4">
                Prepare with confidence
              </h2>

              <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                Generate interview questions from your study
                material and practice important concepts,
                technical topics and discussion points before
                interviews or assessments.
              </p>

              <div className="flex flex-wrap gap-8 mt-10 text-sm text-gray-600">
                <span>Technical Questions</span>
                <span>Concept Review</span>
                <span>Mock Preparation</span>
                <span>Interview Ready</span>
              </div>

            </div>

          </motion.div>
        )}


        <div className="space-y-4">

          {questions.map((q) => (
            <motion.div
              key={q.id}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-[#FFFDF5] p-6 rounded-3xl shadow-md"
            >
              <p className="text-lg">
                <strong>
                  Q{q.id}.
                </strong>{" "}
                {q.question}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default InterviewQuestions;