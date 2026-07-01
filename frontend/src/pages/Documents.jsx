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
          <h1 className="text-4xl font-bold">
            My Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Upload and manage your study materials
          </p>
        </div>

        {/* Upload Section */}

        <div className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md border-2 border-dashed border-[#C2410C] text-center">

          <h2 className="text-2xl font-bold mb-4">
            Upload New Document
          </h2>

          <p className="text-gray-500 mb-5">
            Upload your PDF and start learning smarter
          </p>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(e.target.files[0])
            }
            className="mb-4"
          />

          {file && (
            <p className="text-green-600 mb-4">
              📄 {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="bg-[#C2410C] hover:bg-[#9A3412] px-6 py-3 rounded-xl font-semibold"
          >
            Upload PDF
          </button>
        </div>

        {/* Documents */}

        <div className="bg-[#FFFDF5] rounded-3xl p-8 shadow-md">

          <h2 className="text-2xl font-bold mb-6">
            📚 Uploaded Documents
          </h2>

          {pdfs.length === 0 ? (
            <div className="py-10 text-center">

              <h3 className="text-2xl font-bold">
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
                className="bg-[#F5F3E7] p-5 rounded-2xl mb-4 flex justify-between items-center"
              >

                <div>
                  <h3 className="font-semibold text-lg">
                    📄 {pdf.title}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    Progress: {pdf.progress || 0}%
                  </p>
                </div>

                <div className="flex gap-3">

                  <Link
                    to={`/pdf/${pdf._id}`}
                    className="px-5 py-2.5 rounded-xl bg-[#C2410C] text-black font-medium hover:shadow-md hover:scale-105 transition-all duration-300"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleDelete(pdf._id)}
                    className="px-5 py-2.5 rounded-xl border border-black text-black font-medium hover:bg-black hover:text-white hover:scale-105 transition-all duration-300"
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