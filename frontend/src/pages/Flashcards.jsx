import Layout from "../components/Layout";
import Flashcard from "../components/Flashcard";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");

  const generateFlashcards = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/flashcards/${selectedPdf}`
      );

      setCards(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <Layout>
      <div className="space-y-8">



        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">
            Flashcards
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Learn faster with interactive flashcards.
          </p>
        </div>



        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-lg">

          <select
            value={selectedPdf}
            onChange={(e) =>
              setSelectedPdf(e.target.value)
            }
            className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E9D66B] mb-4"
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
            onClick={generateFlashcards}
            className="w-full bg-[#E9D66B] text-black py-4 rounded-2xl font-semibold shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            Generate Flashcards
          </button>

        </div>


        {loading && (
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">

            <div className="w-12 h-12 border-4 border-yellow-200 border-t-[#E9D66B] rounded-full animate-spin mx-auto mb-4"></div>

            <p className="font-semibold text-lg">
              Generating Flashcards...
            </p>

            <p className="text-gray-500 mt-2">
              Please wait while your document is processed.
            </p>

          </div>
        )}



        {cards.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-12 shadow-lg"
          >
            <motion.div
              animate={{
                x: [0, 20, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-[#E9D66B]/20 rounded-full blur-3xl"
            />

            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
              }}
              className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-2xl">

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-black"
              >
                Start learning with flashcards
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4 text-gray-500 leading-relaxed"
              >
                Select a document and generate flashcards to review key concepts,
                definitions, formulas and important topics in a focused learning format.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-8 mt-8 text-sm text-gray-600"
              >
                <span>Active Recall</span>
                <span>Quick Revision</span>
                <span>Focused Learning</span>
              </motion.div>

            </div>
          </motion.div>
        )}
      </div>

    
    </Layout >
  );
};

export default Flashcards;
