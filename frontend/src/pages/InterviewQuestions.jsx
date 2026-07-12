import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

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
      toast.error("Please select a PDF");
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

      toast.error(
        error.response?.data?.error ||
        "Failed to generate interview questions."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyQuestions = async () => {
    try {
      const text = questions
        .map((q) => `Q${q.id}. ${q.question}`)
        .join("\n\n");

      await navigator.clipboard.writeText(text);

      toast.success("Interview Questions copied successfully!");
    } catch {
      toast.error("Failed to copy Interview Questions.");
    }
  };

  const downloadQuestions = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Archivio - Interview Questions", 15, 20);

    doc.setDrawColor(194, 65, 12);
    doc.line(15, 25, 195, 25);

    const text = questions
      .map((q) => `Q${q.id}. ${q.question}`)
      .join("\n\n");

    const lines = doc.splitTextToSize(text, 180);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(lines, 15, 35);

    doc.save("Archivio-Interview-Questions.pdf");
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Interview Questions
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
            Generate interview questions from PDFs
          </p>
        </div>

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
            onClick={generateQuestions}
            disabled={!selectedPdf || loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition
${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>

        </div>

        {loading && (
          <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 text-[#C2410C] font-semibold">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-100">●</span>
              <span className="animate-bounce delay-200">●</span>
              Archivio is generating questions...
            </div>
          </div>
        )}
        {questions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 lg:p-12"
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

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
                Prepare with confidence
              </h2>

              <p className="text-gray-500 mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Generate interview questions from your study
                material and practice important concepts,
                technical topics and discussion points before
                interviews or assessments.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-8 mt-8 text-xs sm:text-sm text-gray-600">
                <span>Technical Questions</span>
                <span>Concept Review</span>
                <span>Mock Preparation</span>
                <span>Interview Ready</span>
              </div>

            </div>

          </motion.div>
        )}

        {questions.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FFFDF5] p-5 rounded-2xl shadow-md mb-6">

            <div>
              <h2 className="text-2xl font-bold">
                🎤 Interview Questions
              </h2>

              <p className="text-gray-500">
                {questions.length} Questions Generated
              </p>
            </div>

            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">

              <button
                onClick={copyQuestions}
                className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
              >
                Copy
              </button>

              <button
                onClick={downloadQuestions}
                className="w-full sm:w-auto bg-[#C2410C] text-white px-4 py-2 rounded-xl hover:bg-[#9A3412] transition"
              >
                Download PDF
              </button>

            </div>

          </div>
        )}


        {questions.length > 0 && (
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
                className="bg-[#FFFDF5] p-5 sm:p-6 rounded-3xl shadow-md"
              >
                <p className="text-base sm:text-lg break-words leading-relaxed">
                  <strong>
                    Q{q.id}.
                  </strong>{" "}
                  {q.question}
                </p>
              </motion.div>
            ))}

          </div>
        )}

      </div>
    </Layout>
  );
};

export default InterviewQuestions;