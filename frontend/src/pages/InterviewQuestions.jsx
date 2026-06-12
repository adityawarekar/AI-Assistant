import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

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
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const generateQuestions = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/interview/${selectedPdf}`
      );

      setQuestions(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            Interview Questions
          </h1>

          <p className="text-gray-500 mt-2">
            Generate interview questions from PDFs
          </p>
        </div>

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
            onClick={generateQuestions}
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Generate Questions
          </button>

        </div>

        {loading && (
          <div className="text-yellow-600 font-semibold">
            Archivio is generating questions...
          </div>
        )}

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
              className="bg-[#FFFDF5] p-6 rounded-3xl shadow-md"
            >
              <p className="text-lg">
                <strong>
                  Q{q.id}.
                </strong>{" "}
                {q.question}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default InterviewQuestions;