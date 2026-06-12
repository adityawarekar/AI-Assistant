import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

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

      setResults(
        Array.isArray(res.data.results)
          ? res.data.results
          : []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <h1 className="text-4xl font-bold">
          PDF Search
        </h1>

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

          <input
            type="text"
            placeholder="Search keyword..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="w-full p-4 rounded-xl border border-gray-200 mb-4"
          />

          <button
            onClick={searchPdf}
            className="bg-[#E9D66B] text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            Search
          </button>

        </div>

        {loading && (
          <p className="text-yellow-600 font-semibold">
            Searching...
          </p>
        )}

        <div className="space-y-4">

          {results.map((result, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="bg-[#FFFDF5] p-5 rounded-2xl shadow-md hover:-translate-y-1 transition-all"
            >
              {result}
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default PdfSearch;