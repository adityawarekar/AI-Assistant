import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

const PracticeSheet = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [practiceSheet, setPracticeSheet] = useState("");
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

  const generatePracticeSheet = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/practice-sheet/${selectedPdf}`
      );

      setPracticeSheet(
        res.data.practiceSheet
      );

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyPracticeSheet = () => {
    navigator.clipboard.writeText(
      practiceSheet
    );

    alert("Practice Sheet copied!");
  };

  const downloadPracticeSheet = () => {
    const blob = new Blob(
      [practiceSheet],
      { type: "text/plain" }
    );
    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "practice-sheet.txt";

    link.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Practice Sheet
        </h1>

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
          onClick={generatePracticeSheet}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate Practice Sheet
        </button>

        {loading && (
          <p className="mt-4">
            Generating Practice Sheet...
          </p>
        )}

        {practiceSheet && (
          <div className="bg-slate-800 p-6 rounded-xl mt-6">
            <pre className="whitespace-pre-wrap">
              {practiceSheet}
            </pre>
            <div className="flex gap-3 mt-4">
              <button
                onClick={copyPracticeSheet}
                className="bg-green-600 px-4 py-2 rounded mt-4"
              >
                Copy Practice Sheet
              </button>
              <button
                onClick={downloadPracticeSheet}
                className="bg-purple-600 px-4 py-2 rounded"
              >
                Downlaod Practice Sheet

              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PracticeSheet;