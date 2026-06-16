import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const generatePracticeSheet = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPracticeSheet = () => {
    navigator.clipboard.writeText(
      practiceSheet
    );

    alert("Copied!");
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
      <div className="space-y-6">

        <h1 className="text-4xl font-bold">
          Practice Sheet
        </h1>

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
            onClick={generatePracticeSheet}
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Generate Practice Sheet
          </button>

        </div>

        {loading && (
          <p className="text-yellow-600 font-semibold">
            Generating Practice Sheet...
          </p>
        )}

        {!practiceSheet && !loading && (
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
                Practice Workspace
              </p>

              <h2 className="text-4xl font-bold mt-4">
                Strengthen your understanding
              </h2>

              <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                Create practice sheets from your study
                material and reinforce learning through
                structured questions and problem solving.
              </p>

              <div className="flex flex-wrap gap-8 mt-10 text-sm text-gray-600">
                <span>Practice Questions</span>
                <span>Self Assessment</span>
                <span>Problem Solving</span>
                <span>Exam Ready</span>
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
            className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md"
          >
            <div className="flex gap-3 mb-6">

              <button
                onClick={copyPracticeSheet}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Copy
              </button>

              <button
                onClick={downloadPracticeSheet}
                className="bg-[#E9D66B] text-black px-4 py-2 rounded-xl"
              >
                Download
              </button>

            </div>

            <pre className="whitespace-pre-wrap leading-8 text-gray-700">
              {practiceSheet}
            </pre>

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default PracticeSheet;