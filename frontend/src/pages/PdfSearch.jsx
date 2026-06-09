import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";

const PdfSearch = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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

  const searchPdf = async () => {
    if (!selectedPdf || !query) {
      alert("Select PDF and enter search text");
      return;
    }

    try {
      setLoading(true);

      const res = await API.get(
        `/pdf/search/${selectedPdf}?query=${query}`
      );

      setResults(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          PDF Search
        </h1>

        <p className="text-gray-400 mt-2 mb-6">
          Search inside uploaded PDFs
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

        <input
          type="text"
          placeholder="Search keyword..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          className="w-full p-3 rounded-lg bg-slate-800 mb-4"
        />

        <button
          onClick={searchPdf}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Search
        </button>

        {loading && (
          <p className="mt-4">
            Searching...
          </p>
        )}

        <div className="mt-6 space-y-3">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-slate-800 p-4 rounded-lg"
            >
              {result}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PdfSearch;