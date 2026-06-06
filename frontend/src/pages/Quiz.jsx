import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";

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
      setQuestions(res.data);
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
    console.log(selectedAnswers);

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
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Quiz Generator
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Generate quizzes from PDFs
        </p>

        <select
          value={selectedPdf}
          onChange={(e) =>
            setSelectedPdf(e.target.value)
          }
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
          onClick={generateQuiz}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate Quiz
        </button>

        {loading && (
          <p className="mt-4">
            Generating Quiz...
          </p>
        )}

        <div className="mt-8 space-y-6">
          {questions.map((q, index) => (
            <div
              key={index}
              className="bg-slate-800 p-5 rounded-xl"
            >
              <h2 className="font-bold mb-3">
                Q{index + 1}. {q.question}
              </h2>

              {q.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className="mb-2"
                >
                  <button
                    onClick={() =>
                      handleAnswerSelect(
                        index,
                        option
                      )
                    }
                    className={`border px-3 py-2 rounded w-full text-left ${selectedAnswers[index] === option
                      ? "bg-green-600"
                      : ""
                      }`}
                  >
                    {option}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
        {questions.length > 0 && (
          <button
            onClick={calculateScore}
            className="bg-green-600 px-4 py-2 rounded mt-6"
          >
            Submit Quiz
          </button>
        )}
        {score !== null && (
          <h2 className="text-2xl font-bold mt-4">
            Score: {score} / {questions.length}
          </h2>
        )}
      </div>
    </Layout>
  );
};

export default Quiz;