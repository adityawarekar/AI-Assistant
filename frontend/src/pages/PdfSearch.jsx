import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

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
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const searchPdf = async () => {
    if (!selectedPdf || !query) {
      toast.error("Select PDF and enter search text");
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
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }


      toast.error(
        error.response?.data?.error ||
        "Failed to search  PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            PDF Search
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-gray-500 mt-2">
            Search for keywords, concepts, and topics inside your documents.
          </p>
        </div>

        <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-3xl shadow-md">

          <select
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
            placeholder="Search keyword..."
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            className="w-full p-3 sm:p-4 rounded-xl border border-gray-200 mb-4 text-sm sm:text-base"
          />

          <button
            onClick={searchPdf}
            disabled={!selectedPdf || !query || loading}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition
    ${!selectedPdf || !query || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-105"
              }`}
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>

        {loading && (
          <div className="bg-[#FFFDF5] p-4 sm:p-6 rounded-2xl shadow-md">
            <div className="flex items-center gap-2 text-[#C2410C] font-semibold">
              <span className="animate-bounce">●</span>
              <span className="animate-bounce delay-100">●</span>
              <span className="animate-bounce delay-200">●</span>
              Archivio is searching...
            </div>
          </div>
        )}

        {results.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg p-6 sm:p-8 lg:p-12"
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
              className="absolute -top-10 -right-10 w-72 h-72 bg-[#E9D66B]/20 rounded-full blur-3xl"
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
              className="absolute -bottom-16 -left-10 w-80 h-80 bg-black/5 rounded-full blur-3xl"
            />

            <div className="relative z-10 max-w-3xl">

              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">
                Search Workspace
              </p>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-4">
                Find information instantly
              </h2>

              <p className="text-gray-500 mt-5 text-sm sm:text-base lg:text-lg leading-relaxed">
                Search through your documents and quickly locate
                important concepts, definitions, formulas and
                topics without manually reading every page.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-6 lg:gap-8 mt-8 text-xs sm:text-sm text-gray-600">
                <span>Instant Results</span>
                <span>Topic Discovery</span>
                <span>Quick Lookup</span>
                <span>Focused Research</span>
              </div>

            </div>

          </motion.div>
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
              className="bg-[#FFFDF5] p-4 sm:p-5 rounded-2xl shadow-md hover:-translate-y-1 transition-all"
            >
              <p className="break-words text-sm sm:text-base leading-relaxed">
                {result}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </Layout>
  );
};

export default PdfSearch;