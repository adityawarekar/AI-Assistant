import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";

const RevisionNotes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [revisionNotes, setRevisionNotes] = useState("");
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

  const generateRevisionNotes = async () => {
    if (!selectedPdf) {
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/revision/${selectedPdf}`
      );

      setRevisionNotes(
        res.data.revisionNotes
      );
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      toast.error(
        error.response?.data?.error ||
        "Failed to generate revision notes."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = async () => {
    try {
      await navigator.clipboard.writeText(revisionNotes);
      toast.success("Revision Notes copied successfully!");
    } catch (error) {
      toast.error("Failed to copy Revision Notes.");
    }
  };

  const downloadRevisionNotes = () => {
    const doc = new jsPDF();

    const lines = doc.splitTextToSize(revisionNotes, 180);

    doc.setFontSize(12);
    doc.text(lines, 15, 20);

    doc.save("Archivio-Revision-Notes.pdf");
  };

  return (
    <Layout>
      <div className="space-y-5 sm:space-y-6">

        <h1 className="text-3xl sm:text-4xl font-bold">
          Revision Notes
        </h1>

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
            onClick={generateRevisionNotes}
            disabled={!selectedPdf || loading}
            className={`w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition text-sm sm:text-base
    ${!selectedPdf || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Revision Notes"}
          </button>

        </div>

        {loading && (
          <div className="text-[#C2410C] font-semibold text-sm sm:text-base flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-orange-200 border-t-[#C2410C] rounded-full animate-spin" />
            Archivio is creating revision notes...
          </div>
        )}

        {!revisionNotes && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-5 sm:p-8 lg:p-12"
          >

            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute -top-10 -right-10 w-32 h-32 sm:w-72 sm:h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
            />

            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -bottom-16 -left-10 w-36 h-36 sm:w-80 sm:h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                Revision Workspace
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4">
                Revise smarter, remember longer
              </h2>

              <p className="text-gray-500 mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Generate concise revision notes from your
                documents and focus only on the concepts
                that matter most during exam preparation.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-8 mt-6 sm:mt-10 text-xs sm:text-sm text-gray-600">
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Quick Revision</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Key Concepts</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Exam Preparation</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Focused Learning</span>
              </div>

            </div>

          </motion.div>
        )}

        {revisionNotes && (
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
                onClick={copyNotes}
                className="flex-1 sm:flex-none bg-black text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:scale-105 transition"
              >
                Copy
              </button>

              <button
                onClick={downloadRevisionNotes}
                className="flex-1 sm:flex-none bg-[#C2410C] text-white px-4 py-2 rounded-xl text-sm sm:text-base hover:bg-[#9A3412] hover:scale-105 transition"
              >
                Download
              </button>

            </div>

            <pre className="whitespace-pre-wrap leading-7 sm:leading-8 text-gray-700 text-sm sm:text-base">
              {revisionNotes}
            </pre>

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default RevisionNotes;