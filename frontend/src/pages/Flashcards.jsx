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

      setCards([]);

      const res = await API.get(
        `/pdf/flashcards/${selectedPdf}`
      );

      setCards(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }

      alert(
        error.response?.data?.error ||
        "Failed to generate flashcards."
      );
    } finally {
      setLoading(false);
    }
  };
  const copyFlashcards = () => {
    const text = cards
      .map(
        (card, index) =>
          `Q${index + 1}: ${card.question}\nA: ${card.answer}`
      )
      .join("\n\n");

    navigator.clipboard.writeText(text);
  };

  const downloadFlashcards = () => {
    const text = cards
      .map(
        (card, index) =>
          `Q${index + 1}: ${card.question}\nA: ${card.answer}`
      )
      .join("\n\n");

    const blob = new Blob([text], {
      type: "text/plain",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "Archivio-Flashcards.txt";

    link.click();

    window.URL.revokeObjectURL(url);
  };

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
            disabled={!selectedPdf || loading}
            className={`w-full py-4 rounded-2xl font-semibold shadow-md transition-all
    ${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:shadow-xl hover:scale-[1.02]"
              }`}
          >
            {loading ? "Generating..." : "Generate Flashcards"}
          </button>

        </div>


        {loading && (
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center">

            <div className="w-12 h-12 border-4 border-orange-200 border-t-[#C2410C] rounded-full animate-spin mx-auto mb-4"></div>

            <p className="font-semibold text-lg">
              Generating Flashcards...
            </p>

            <p className="text-gray-500 mt-2">
              Please wait while your document is processed.
            </p>

          </div>
        )}
        {cards.length > 0 && !loading && (

          <div className="flex justify-between items-center bg-[#FFFDF5] p-5 rounded-2xl shadow-md">

            <div>
              <h2 className="text-2xl font-bold">
                📚 Flashcards Generated
              </h2>

              <p className="text-gray-500">
                {cards.length} Flashcards
              </p>
            </div>

            <div className="flex gap-3">

              <button
                onClick={copyFlashcards}
                className="bg-black text-white px-4 py-2 rounded-xl"
              >
                Copy
              </button>

              <button
                onClick={downloadFlashcards}
                className="bg-[#C2410C] text-black px-4 py-2 rounded-xl"
              >
                Download
              </button>

            </div>

          </div>

        )}



        {cards.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-12"
          >

            <motion.div
              animate={{
                x: [0, 25, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: 8,
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
                duration: 10,
                repeat: Infinity,
              }}
              className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Flashcard Workspace
              </p>

              <h2 className="text-4xl font-bold mt-4">
                Learn through active recall
              </h2>

              <p className="text-gray-500 mt-5 text-lg leading-relaxed">
                Turn your study material into interactive flashcards
                designed to improve memory retention and help you
                revise important concepts faster.
              </p>

              <div className="flex flex-wrap gap-8 mt-10 text-sm text-gray-600">
                <span>Active Recall</span>
                <span>Memory Retention</span>
                <span>Quick Learning</span>
                <span>Exam Revision</span>
              </div>

            </div>

          </motion.div>
        )}
        {cards.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.4,
                }}
              >
                <Flashcard
                  question={card.question}
                  answer={card.answer}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>


    </Layout >
  );
};

export default Flashcards;
