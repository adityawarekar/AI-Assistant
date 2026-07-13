import Layout from "../components/Layout";
import { useState, useEffect, useRef } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Chat = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const askQuestion = async () => {
    if (!selectedPdf || !question) {
      toast.error("Please select a PDF and enter a question");
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
          <h1 className="text-3xl sm:text-4xl font-bold">
            Chat With PDF
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Ask questions and learn directly from your documents.
          </p>
        </div>

        <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-3xl shadow-md">

          <select
            disabled={loading}
            value={selectedPdf}
            onChange={(e) =>
              setSelectedPdf(e.target.value)
            }
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 mb-4 text-sm sm:text-base"
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

          <input
            disabled={loading}
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
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 text-sm sm:text-base mb-3"
          />

          <div className="flex flex-row gap-2 sm:gap-3">
            <button
              onClick={askQuestion}
              disabled={!selectedPdf || loading}
              className={`flex-1 sm:flex-none sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${!selectedPdf || loading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
                }`}
            >
              {loading ? "Thinking..." : "Ask"}
            </button>

            <button
              onClick={clearChat}
              disabled={loading}
              className="flex-1 sm:flex-none sm:w-auto bg-white text-black border border-gray-200 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-sm sm:text-base"
            >
              Clear
            </button>
          </div>

        </div>

        {loading && (
          <div className="bg-[#FFFDF5] p-4 rounded-2xl shadow-md">

            <div className="flex items-center gap-2 text-[#C2410C] font-semibold text-sm sm:text-base">

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

        {messages.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-5 sm:p-8 lg:p-12"
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
              className="absolute -top-10 -right-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
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
              className="absolute -bottom-16 -left-10 w-44 h-44 sm:w-80 sm:h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-gray-400">
                Chat Workspace
              </p>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold mt-3 sm:mt-4">
                Ask questions from your documents
              </h2>

              <p className="text-gray-500 mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Select a document and start a conversation.
                Get instant answers, explanations and insights
                directly from your study material without
                searching through pages manually.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 text-xs sm:text-sm text-gray-600">
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Instant Answers</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Context Aware</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Deep Understanding</span>
                <span className="bg-gray-50 px-2.5 py-1 rounded-full sm:bg-transparent sm:px-0 sm:py-0">Focused Learning</span>
              </div>

            </div>

          </motion.div>
        )}

        <div className="space-y-4 max-h-[55vh] lg:max-h-[500px] overflow-y-auto pr-1 sm:pr-2">

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
              className={`p-3 sm:p-4 rounded-2xl max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] shadow-md ${msg.type === "question"
                ? "bg-[#E9D66B] text-black ml-auto"
                : "bg-white text-black"
                }`}
            >
              <p className="font-semibold mb-2 text-sm sm:text-base">
                {msg.type === "question"
                  ? "🧑 You"
                  : "📚 Archivio"}
              </p>

              <p className="whitespace-pre-wrap break-words text-sm sm:text-base">
                {msg.text}
              </p>
            </motion.div>
          ))}

          <div ref={messagesEndRef} />

        </div>

      </div>
    </Layout>
  );
};

export default Chat;