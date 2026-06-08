import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";

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

  const generateQuestions = async() => {
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
}
return (
  <Layout>
    <div className='p-6'>
      <h1 classname="text-3xl font-bold">
        Interview Questions
      </h1>
      <p className='text-gray-400 mt-2 mb-8'>
        Generate interview questions from PDFs

      </p>
      <select
        value={selectedPdf}
        onChange={(e) =>
          setSelectedPdf(e.target.value)
        }
        className='bg-slate-800 p-3 rounded-lg mb-4 w-full'

      >
        <option vlaue=''>
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
        className='bg-provide-600 px-4 py-2 rounded-lg'
      >
        Generate Questions

      </button>
      {
        loading && (
          <p className='mt-4'>
            Generating Questions...
          </p>
        )}
      <div classname="mt-6 space-y-4">
        {questions.map((q) => (
          <div
            key={q.id}
            className='bg-salte-800 p-4 rounded-lg'
          >
            <p>
              <strong>Q{q.id}.</strong>{" "}
              {q.question}
            </p>
          </div>
        ))}
      </div>
    </div>

  </Layout>

);
};

export default InterviewQuestions
