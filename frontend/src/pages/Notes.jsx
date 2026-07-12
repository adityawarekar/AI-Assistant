import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

const Notes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [notes, setNotes] = useState("");
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

  const generateNotes = async () => {
    if (!selectedPdf) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/notes/${selectedPdf}`
      );

      setNotes(res.data.notes);

    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      toast.error(
        error.response?.data?.error ||
        "Failed to generate notes."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      toast.success("Notes copied successfully!");
    } catch (error) {
      toast.error("Failed to copy notes.");
    }
  };

  const downloadNotes = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Archivio - Notes", 15, 20);

    doc.setDrawColor(194, 65, 12);
    doc.line(15, 25, 195, 25);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(notes, 180);

    doc.text(lines, 15, 35);

    doc.save("Archivio-Notes.pdf");
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Notes Generator
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
            Generate smart study notes from PDFs
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
            onClick={generateNotes}
            disabled={!selectedPdf || loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition
    ${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Notes"}
          </button>

        </div>

        {/* Loading */}

        {loading && (
          <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-[#C2410C] font-semibold">

              <span className="animate-bounce text-[#C2410C]">
                ●
              </span>

              <span className="animate-bounce delay-100 text-[#C2410C]">
                ●
              </span>

              <span className="animate-bounce delay-200 text-[#C2410C]">
                ●
              </span>

              Archivio is generating notes...
            </div>

          </div>
        )}

        {!notes && !loading && (
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

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.2em] text-gray-400"
              >
                Notes Workspace
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4"
              >
                Organize important information
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-gray-500 mt-5 text-sm sm:text-base lg:text-lg leading-relaxed"
              >
                Generate structured notes from your documents and
                quickly capture important concepts, explanations,
                definitions and key takeaways for revision.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3 sm:gap-6 lg:gap-8 mt-8 text-xs sm:text-sm text-gray-600"
              >
                <span>Structured Notes</span>
                <span>Quick Revision</span>
                <span>Key Concepts</span>
                <span>Study Ready</span>
              </motion.div>

            </div>

          </motion.div>
        )}

        {/* Notes Output */}

        {notes && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="bg-[#FFFDF5] p-5 sm:p-8 rounded-3xl shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <h2 className="text-2xl font-bold">
                📚 Generated Notes
              </h2>

              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">

                <button
                  onClick={copyNotes}
                  className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  Copy
                </button>

                <button
                  onClick={downloadNotes}
                  className="w-full sm:w-auto bg-[#C2410C] text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                >
                  Download
                </button>

              </div>

            </div>

            <pre className="whitespace-pre-wrap break-words overflow-x-auto text-sm sm:text-base leading-7 sm:leading-8 text-gray-700">
              {notes}
            </pre>

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default Notes;