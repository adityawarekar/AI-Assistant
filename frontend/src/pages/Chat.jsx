import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";

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
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Chat With PDF
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Ask questions from your PDF
        </p>

        <select
          value={selectedPdf}
          onChange={(e) =>
            setSelectedPdf(e.target.value)
          }
          className="bg-slate-800 p-3 rounded-lg w-full mb-4"
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
          type="text"
          placeholder="Ask a question..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>

        <button
          onClick={clearChat}
          className="bg-red-600 px-4 py-2 rounded-lg ml-3"
        >
          Clear Chat

        </button>

        {loading && (
          <div className="mt-4">
            <p className="text-blue-400 animate-pulse">
              🤖 AI is thinking...
            </p>
          </div>
        )}

        <div className="mt-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg max-w-[80%] ${msg.type === "question"
                  ? "bg-blue-600 ml-auto"
                  : "bg-slate-800"
                }`}
            >
              <p className="font-semibold mb-2">
                {msg.type === "question"
                  ? "🧑 You"
                  : "🤖 AI"}
              </p>

              <p>{msg.text}</p>
            </div>
          ))}
        </div>


      </div>
    </Layout>
  );
};

export default Chat;