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
      console.log(error);
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
      console.log(error);
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
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Generate Topics
          </button>

        </div>

        {/* Loader */}

        {loading && (
          <div className="bg-[#FFFDF5] p-4 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-yellow-600 font-semibold">

              <span className="animate-bounce">
                ●
              </span>

              <span className="animate-bounce delay-100">
                ●
              </span>

              <span className="animate-bounce delay-200">
                ●
              </span>

              Archivio is analyzing topics...
            </div>

          </div>
        )}

        {/* Result */}

        {topics && (
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
            className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md"
          >
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                ⭐ Important Topics
              </h2>

              <button
                onClick={copyTopics}
                className="bg-black text-white px-5 py-2 rounded-xl hover:scale-105 transition"
              >
                Copy
              </button>

            </div>

            <pre className="whitespace-pre-wrap text-gray-700 leading-8">
              {topics}
            </pre>

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default ImportantTopics;