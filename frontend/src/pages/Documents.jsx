import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Documents = () => {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    setUploading(true);
    try {
      await API.post("/pdf/upload", formData);
      toast.success("PDF uploaded successfully!");

      setFile(null);
      fetchPdfs();
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

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

  const handleDelete = async (id) => {
    try {
      await API.delete(`/pdf/${id}`);
      fetchPdfs();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files?.[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    } else {
      toast.error("Please drop a PDF file");
    }
  };

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Documents
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Upload and manage your study materials
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-[#FFFDF5] p-4 sm:p-8 rounded-3xl shadow-md border-2 border-dashed border-[#C2410C] text-center"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4">
            Upload New Document
          </h2>

          <p className="text-sm sm:text-base text-gray-500 mb-5">
            Upload your PDF and start learning smarter
          </p>

          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <label
            htmlFor="pdf-upload"
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full p-6 sm:p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
              file
                ? "border-green-500 bg-green-50"
                : dragActive
                ? "border-[#EA580C] bg-orange-50 scale-[1.01]"
                : "border-[#C2410C] hover:bg-orange-50 hover:border-[#EA580C]"
            }`}
          >
            <motion.span
              key={file ? "selected" : "empty"}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-5xl mb-3"
            >
              {file ? "✅" : "📄"}
            </motion.span>

            <p className="text-lg font-semibold">
              {file ? "PDF Selected" : "Click or Drag PDF Here"}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {file
                ? "Click again to choose another PDF"
                : "PDF files only"}
            </p>
          </label>

          <AnimatePresence>
            {file && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 overflow-hidden"
              >
                <p className="text-green-700 font-medium break-all text-sm sm:text-base">
                  ✅ {file.name}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 w-full sm:w-auto bg-[#C2410C] hover:bg-[#9A3412] disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
          >
            {uploading && (
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            )}
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#FFFDF5] rounded-3xl p-4 sm:p-8 shadow-md"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6">
            📚 Uploaded Documents
          </h2>

          {pdfs.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="text-xl sm:text-2xl font-bold">
                📂 No Documents Yet
              </h3>
              <p className="text-gray-500 mt-2">
                Upload your first PDF to start learning.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {pdfs.map((pdf, i) => (
                  <motion.div
                    key={pdf._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="bg-[#F5F3E7] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base sm:text-lg break-words">
                        📄 {pdf.title}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 max-w-[160px] bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#C2410C] h-full rounded-full transition-all duration-500"
                            style={{ width: `${pdf.progress || 0}%` }}
                          />
                        </div>
                        <span className="text-gray-500 text-xs sm:text-sm whitespace-nowrap">
                          {pdf.progress || 0}%
                        </span>
                      </div>
                    </div>

                    <div className="flex w-full sm:w-auto gap-3 shrink-0">
                      <Link
                        to={`/pdf/${pdf._id}`}
                        className="flex-1 sm:flex-none text-center px-5 py-2.5 rounded-xl bg-[#C2410C] text-white font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(pdf._id)}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-black text-black font-medium hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

      </div>
    </Layout>
  );
};

export default Documents;