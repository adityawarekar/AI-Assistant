import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Documents = () => {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      await API.post("/pdf/upload", formData);
      toast.success("PDF uploaded successfully!");



      setFile(null);

      fetchPdfs();
    } catch (error) {
      console.log(error);
      toast.error("Upload Failed");
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

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}

        <div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            My Documents
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-2">
            Upload and manage your study materials
          </p>
        </div>

        {/* Upload Section */}

        <div className="bg-[#FFFDF5] p-5 sm:p-8 rounded-3xl shadow-md border-2 border-dashed border-[#C2410C] text-center">

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
            className={`flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${file
                ? "border-green-500 bg-green-50"
                : "border-[#C2410C] hover:bg-orange-50 hover:border-[#EA580C]"
              }`}
          >
            <span className="text-5xl mb-3">
              {file ? "✅" : "📄"}
            </span>

            <p className="text-lg font-semibold">
              {file ? "PDF Selected" : "Click to Select PDF"}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {file
                ? "Click again to choose another PDF"
                : "PDF files only"}
            </p>
          </label>

          {file && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3">
              <p className="text-green-700 font-medium break-all">
                ✅ {file.name}
              </p>
            </div>
          )}


          <button
            onClick={handleUpload}
            className="mt-6 w-full sm:w-auto bg-[#C2410C] hover:bg-[#9A3412] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Upload PDF
          </button>
        </div>

        {/* Documents */}

        <div className="bg-[#FFFDF5] rounded-3xl p-5 sm:p-8 shadow-md">

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
            pdfs.map((pdf) => (
              <div
                key={pdf._id}
                className="bg-[#F5F3E7] p-4 sm:p-5 rounded-2xl mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >

                <div>
                  <h3 className="font-semibold text-base sm:text-lg break-words">
                    📄 {pdf.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Progress: {pdf.progress || 0}%
                  </p>
                </div>

                <div className="flex w-full sm:w-auto gap-3">

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

              </div>
            ))
          )}

        </div>

      </div>
    </Layout>
  );
};

export default Documents;