import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

const RevisionNotes = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [revisionNotes, setRevisionNotes] = useState("");
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

  const generateRevisionNotes = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/revision/${selectedPdf}`
      );

      setRevisionNotes(
        res.data.revisionNotes
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(
      revisionNotes
    );

    alert("Revision Notes copied!");
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Revision Notes
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Generate AI Revision Notes
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
          onClick={generateRevisionNotes}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate Revision Notes
        </button>

        {loading && (
          <p className="mt-4">
            Generating Revision Notes...
          </p>
        )}

        {revisionNotes && (
          <div className="bg-slate-800 p-6 rounded-xl mt-6">
            <h2 className="text-xl font-bold mb-3">
              Revision Notes
            </h2>

            <pre className="whitespace-pre-wrap">
              {revisionNotes}
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

export default RevisionNotes;