import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const Chat = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
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

  const askQuestion = async () => {
    if (!selectedPdf || !question) {
      alert("Select PDF and enter question");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post(
        `/pdf/chat/${selectedPdf}`,
        {
          question,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          type: "question",
          text: question,
        },
        {
          type: "answer",
          text: res.data.answer,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setQuestion("");
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-4xl font-bold">
            Chat With PDF
          </h1>

          <p className="text-gray-500 mt-2">
            Ask questions and learn directly from your documents.
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

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Ask something from your PDF..."
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  askQuestion();
                }
              }}
              className="flex-1 p-4 rounded-xl border border-gray-200"
            />

            <button
              onClick={askQuestion}
              disabled={loading}
              className="bg-[#E9D66B] text-black px-6 rounded-xl font-semibold hover:scale-105 transition"
            >
              Ask
            </button>

            <button
              onClick={clearChat}
              className="bg-black text-white px-6 rounded-xl hover:scale-105 transition"
            >
              Clear
            </button>

          </div>

        </div>

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

              Archivio is thinking...
            </div>

          </div>
        )}

        <div className="space-y-4 max-h-[500px] overflow-y-auto">

          {messages.map((msg, index) => (
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
              className={`p-4 rounded-2xl max-w-[80%] shadow-md ${
                msg.type === "question"
                  ? "bg-[#E9D66B] text-black ml-auto"
                  : "bg-white text-black"
              }`}
            >
              <p className="font-semibold mb-2">
                {msg.type === "question"
                  ? "🧑 You"
                  : "📚 Archivio"}
              </p>

              <p className="whitespace-pre-wrap">
                {msg.text}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default Chat;