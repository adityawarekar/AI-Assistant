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
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Flashcards
          </h1>

          <p className="text-gray-500 mt-2">
            Learn faster with smart flashcards
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
            onClick={generateFlashcards}
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Generate Flashcards
          </button>

        </div>

        {/* Loading */}

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

              Archivio is creating flashcards...
            </div>

          </div>
        )}

        {cards.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#FFFDF5] rounded-3xl p-12 text-center shadow-md"
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
              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl">
                ⚡ Fast Learning
              </div>

              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl">
                🧠 Active Recall
              </div>

              <div className="bg-[#F5F3E7] px-6 py-4 rounded-2xl">
                📚 Exam Ready
              </div>
            </div>
          </motion.div>
        )}

        {/* Flashcards */}

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
                y: -10,
                scale: 1.03,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group"
            >
              <div
                className="
  relative
  overflow-hidden
  rounded-3xl
  bg-white
  shadow-lg
  border
  border-gray-100
  group-hover:shadow-2xl
  transition-all
  duration-500
"
              >

                <div
                  className="
    absolute
    inset-0
    bg-gradient-to-r
    from-yellow-100
    via-transparent
    to-orange-100
    opacity-0
    group-hover:opacity-100
    transition
    duration-500
    "
                />

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