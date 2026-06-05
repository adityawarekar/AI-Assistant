import Layout from "../components/Layout";
import Flashcard from "../components/Flashcard";
import { useState, useEffect } from "react";
import axios from "axios";

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

      const res = await axios.get(
        `http://localhost:5001/api/pdf/flashcards/${selectedPdf}`
      );

      setCards(res.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchPdfs = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/pdf"
      );

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
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Flashcards
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Generate AI flashcards from PDFs
        </p>
        <select
          value={selectedPdf}
          onChange={(e) => setSelectedPdf(e.target.value)}
          className="bg-slate-800 p-3 rounded-lg mb-4 w-full"
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
          className="bg-green-600 px-4 py-2 rounded-lg mb-6"
        >
          Generate Flashcards
        </button>

        {loading && (
          <p className="text-yellow-400">
            Generating Flashcards...
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {cards.length > 0 &&
            cards.map((card, index) => (
              <Flashcard
                key={index}
                question={card.question}
                answer={card.answer}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Flashcards;