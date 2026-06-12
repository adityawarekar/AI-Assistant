import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const Quiz = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
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

  const generateQuiz = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/quiz/${selectedPdf}`
      );

      setScore(null);
      setSelectedAnswers({});

      setQuestions(
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

  const handleAnswerSelect = (
    questionIndex,
    answer
  ) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answer,
    });
  };

  const calculateScore = () => {
    let total = 0;

    questions.forEach((question, index) => {
      if (
        selectedAnswers[index] ===
        question.answer
      ) {
        total++;
      }
    });

    setScore(total);
  };

  return (
    <Layout>
      <div className="space-y-6">

        {/* Header */}

        <div>
          <h1 className="text-4xl font-bold">
            Quiz Generator
          </h1>

          <p className="text-gray-500 mt-2">
            Test your knowledge from PDFs
          </p>
        </div>

        {/* Quiz Generator */}

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
            onClick={generateQuiz}
            disabled={loading}
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            {loading
              ? "Generating..."
              : "Generate Quiz"}
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

              Archivio is generating quiz...
            </div>

          </div>
        )}
        {questions.length === 0 && !loading && (
          <div className="relative overflow-hidden bg-[#FFFDF5] rounded-3xl shadow-md p-12 min-h-[400px]">

            {/* Floating Icons */}

            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="absolute top-10 left-10 text-6xl opacity-20"
            >
              📚
            </motion.div>

            <motion.div
              animate={{
                y: [0, 25, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute top-20 right-20 text-6xl opacity-20"
            >
              🧠
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
              }}
              className="absolute bottom-10 left-24 text-5xl opacity-20"
            >
              ✏️
            </motion.div>

            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
              }}
              className="absolute bottom-16 right-16 text-5xl opacity-20"
            >
              🎓
            </motion.div>

            {/* Main Content */}

            <div className="relative z-10 text-center">

              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                }}
                className="text-8xl mb-6"
              >
                🧠
              </motion.div>

              <h2 className="text-4xl font-bold mb-4">
                Ready for Quiz Time?
              </h2>

              <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                Select a PDF and Archivio will
                automatically generate smart quiz
                questions to test your understanding
                and improve your exam preparation.
              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-10">

                <div className="bg-[#F5F3E7] p-6 rounded-2xl">
                  <div className="text-4xl mb-3">
                    📚
                  </div>
                  <h3 className="font-bold">
                    Smart Questions
                  </h3>
                </div>

                <div className="bg-[#F5F3E7] p-6 rounded-2xl">
                  <div className="text-4xl mb-3">
                    ⚡
                  </div>
                  <h3 className="font-bold">
                    Instant Scoring
                  </h3>
                </div>

                <div className="bg-[#F5F3E7] p-6 rounded-2xl">
                  <div className="text-4xl mb-3">
                    🎯
                  </div>
                  <h3 className="font-bold">
                    Exam Ready
                  </h3>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Questions */}

        <div className="space-y-6">

          {questions.map((q, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="bg-[#FFFDF5] p-6 rounded-3xl shadow-md"
            >
              <h2 className="font-bold text-xl mb-4">
                Question {index + 1}
              </h2>

              <p className="mb-4">
                {q.question}
              </p>

              <div className="space-y-3">

                {q.options.map(
                  (option, optionIndex) => (
                    <button
                      key={optionIndex}
                      onClick={() =>
                        handleAnswerSelect(
                          index,
                          option
                        )
                      }
                      className={`w-full text-left p-4 rounded-xl transition ${selectedAnswers[index] ===
                          option
                          ? "bg-[#E9D66B] text-black"
                          : "bg-[#F5F3E7]"
                        }`}
                    >
                      {option}
                    </button>
                  )
                )}

              </div>
            </motion.div>
          ))}

        </div>

        {/* Submit */}

        {questions.length > 0 && (
          <button
            onClick={calculateScore}
            className="bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition"
          >
            Submit Quiz
          </button>
        )}

        {/* Score */}

        {score !== null && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md text-center"
          >
            <h2 className="text-4xl font-bold">
              🎯 {score}/{questions.length}
            </h2>

            <p className="mt-3 text-gray-600">
              You answered {score} questions correctly.
            </p>

            <div className="mt-4 w-full bg-gray-200 h-4 rounded-full">

              <div
                className="bg-[#E9D66B] h-4 rounded-full"
                style={{
                  width: `${(score /
                      questions.length) *
                    100
                    }%`,
                }}
              ></div>

            </div>

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default Quiz;