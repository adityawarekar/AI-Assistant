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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100"
          >
            <h2 className="text-4xl font-bold mb-4">
              Smart Flashcards
            </h2>

            <p className="text-gray-500 max-w-xl mx-auto">
              Generate beautiful study flashcards
              from your PDFs and memorize concepts
              faster using active recall learning.
            </p>

            <div className="flex justify-center gap-4 mt-8 flex-wrap">

              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl font-medium shadow-sm">
                ⚡ Fast Learning
              </div>

              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl font-medium shadow-sm">
                🧠 Active Recall
              </div>

              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl font-medium shadow-sm">
                📚 Exam Ready
              </div>

            </div>
          </motion.div>
        )}

        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-300">

                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-transparent to-orange-100 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                <div className="relative z-10">
                  <Flashcard
                    question={card.question}
                    answer={card.answer}
                  />
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default Flashcards;
