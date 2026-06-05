import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PdfViewer = () => {
  const { id } = useParams();

  const [pdf, setPdf] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchPdf();
  }, [id]);

  const fetchPdf = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/pdf/${id}`
      );

      setPdf(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!pdf) {
    return <h1>Loading...</h1>;
  }

  const handleSummary = async () => {
    try {
      setLoading(true);
      // Dummy data for now
      setTimeout(() => {
        setSummary(`
        • This document explains important concepts.
        • It contains study material for revision.
        • Read carefully before exams.
        `);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const pdfUrl = `http://localhost:5001/${pdf.fileUrl}`;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {pdf.title}
      </h1>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Open PDF
      </a>
      <button
        onClick={handleSummary}
        className="bg-green-600 px-4 py-2 rounded ml-4"
      >
        Generate Summary
      </button>

      {loading && (
        <p className="mt-4 text-yellow-400">
          Generating Summary...
        </p>
      )}

      {summary && (
        <div className="bg-slate-800 p-6 rounded-xl mt-6">
          <h2 className="text-xl font-bold mb-3">
            AI Summary
          </h2>

          <pre className="whitespace-pre-wrap">
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
};

export default PdfViewer;