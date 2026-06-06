import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

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

  const generateNotes = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5001/api/pdf/notes/${selectedPdf}`
      );

      setNotes(res.data.notes);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(notes);
    alert("Notes copied!");
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Notes Generator
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Generate notes from PDFs
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
          onClick={generateNotes}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate Notes
        </button>

        {loading && (
          <p className="mt-4">
            Generating Notes...
          </p>
        )}

        {notes && (
          <div className="bg-slate-800 p-6 rounded-xl mt-6">
            <h2 className="text-xl font-bold mb-3">
              Notes
            </h2>

            <pre className="whitespace-pre-wrap">
              {notes}
            </pre>

            <button
              onClick={copyNotes}
              className="bg-green-600 px-4 py-2 rounded mt-4"
            >
              Copy Notes
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notes;