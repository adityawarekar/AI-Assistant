import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
      toast.error("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/quiz/${selectedPdf}`
      );
      console.log("Quiz Response:", res.data);

      setScore(null);
      setSelectedAnswers({});

      setQuestions(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.error ||
        "Failed to generate quiz."
      );
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

        

        <div>
          <h1 className="text-4xl font-bold">
            Quiz Generator
          </h1>

          <p className="text-gray-500 mt-2">
            Test your knowledge from PDFs
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
            onClick={generateQuiz}
            disabled={!selectedPdf || loading}
            className={`px-6 py-3 rounded-xl font-semibold transition
  ${!selectedPdf || loading
                ? "bg-gray-300 cursor-not-allowed"
               : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

        </div>

        

        {loading && (
          <div className="bg-[#FFFDF5] p-4 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-[#C2410C] font-semibold">

              <span className="animate-bounce  text-[#C2410C]">
                ●
              </span>

              <span className="animate-bounce delay-100  text-[#C2410C]">
                ●
              </span>

              <span className="animate-bounce delay-200  text-[#C2410C]">
                ●
              </span>

              Archivio is generating quiz...
            </div>

          </div>
        )}
        {questions.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-12"
          >

            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 10,
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
                duration: 12,
                repeat: Infinity,
              }}
              className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.2em] text-gray-400"
              >
                Quiz Workspace
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-bold mt-4"
              >
                Measure your understanding
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="text-gray-500 mt-5 text-lg leading-relaxed"
              >
                Generate a personalized quiz from your documents and
                evaluate how well you understand important concepts,
                definitions and key topics before revision sessions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-8 mt-10 text-sm text-gray-600"
              >
                <span>Instant Questions</span>
                <span>Knowledge Check</span>
                <span>Revision Ready</span>
                <span>Progress Tracking</span>
              </motion.div>

            </div>

          </motion.div>
        )}
        {/* Quiz Result */}

        {questions.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >

            <div className="flex items-center justify-between">

              <h2 className="text-3xl font-bold">
                Quiz Questions
              </h2>

              <span className="bg-[#C2410C] px-4 py-2 rounded-xl font-semibold">
                {questions.length} Questions
              </span>

            </div>

            <p className="text-gray-500">
              Total Questions: {questions.length}
            </p>

            {questions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-gray-100 rounded-3xl shadow-lg p-8"
              >

                <h3 className="text-xl font-semibold mb-6">
                  {index + 1}. {question.question}
                </h3>

                <div className="space-y-4">

                  {question.options?.map((option, optionIndex) => (

                    <label
                      key={optionIndex}
                      className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all hover:border-[#C2410C]
              ${selectedAnswers[index] === option
                          ? "bg-[#FFF8D9] border-[#C2410C]"
                          : "border-gray-200"
                        }`}
                    >

                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={selectedAnswers[index] === option}
                        onChange={() =>
                          handleAnswerSelect(index, option)
                        }
                      />

                      <span>{option}</span>

                    </label>

                  ))}

                </div>

              </motion.div>
            ))}

            <div className="flex justify-center">

              <button
                onClick={calculateScore}
                className="bg-[#C2410C] hover:scale-105 transition-all px-8 py-4 rounded-2xl font-bold text-black shadow-lg"
              >
                Submit Quiz
              </button>

            </div>

            {score !== null && (

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-[#FFFDF5] border border-[#C2410C] rounded-3xl p-8 text-center shadow-lg"
              >

                <h2 className="text-3xl font-bold mb-2">
                  Quiz Completed 
                </h2>

                <p className="text-5xl font-bold text-[#C2410C] mt-4">
                  {score} / {questions.length}
                </p>

                <p className="text-gray-500 mt-3">
                  Keep practicing to improve your score.
                </p>

              </motion.div>

            )}

          </motion.div>
        )}

      </div>
    </Layout>
  );
};

export default Quiz;