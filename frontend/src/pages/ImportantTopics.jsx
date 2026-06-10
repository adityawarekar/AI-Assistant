import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";

const ImportantTopics = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [topics, setTopics] = useState("");
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

  const generateTopics = async () => {
    if (!selectedPdf) {
      alert("Please select a PDF");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/important-topics/${selectedPdf}`
      );

      setTopics(res.data.topics);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyTopics = () => {
    navigator.clipboard.writeText(topics);
    alert("Topics copied!");
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Important Topics
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
          onClick={generateTopics}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Generate Important Topics
        </button>

        {loading && (
          <p className="mt-4">
            Generating Topics...
          </p>
        )}

        {topics && (
          <div className="bg-slate-800 p-6 rounded-xl mt-6">
            <pre className="whitespace-pre-wrap">
              {topics}
            </pre>

            <button
              onClick={copyTopics}
              className="bg-green-600 px-4 py-2 rounded mt-4"
            >
              Copy Topics
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ImportantTopics;