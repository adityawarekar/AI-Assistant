import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import API from "../services/api";
import { Link } from "react-router-dom";

const Documents = () => {
  const [file, setFile] = useState(null);
  const [pdfs, setPdfs] = useState([]);
  const handleUpload = async () => {
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("Uploading...");
    console.log(localStorage.getItem("token"));
    console.log(API.defaults.baseURL);
    if (!file) {
      alert("Please select a PDF");
      return;
    }
    const formData = new FormData();

    formData.append("pdf", file);

    try {
      const res = await API.post(
        "/pdf/upload",
        formData
      );

      console.log(res.data);

      alert("PDF Uploaded Successfully");
      fetchPdfs();
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
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
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            My Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Upload and manage your study materials
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-xl">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}
          />

          {file && (
            <p className="mt-3 text-green-400">
              Selected: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Upload PDF
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <div className="space-y-3">
            {pdfs.length === 0 ? (
              <p className="text-gray-400">
                No documents uploaded yet
              </p>
            ) : (
              pdfs.map((pdf) => (
                <div
                  key={pdf._id}
                  className="bg-slate-700 p-4 rounded-lg flex justify-between items-center"
                >
                  <span>📄 {pdf.title}</span>

                  <div className="flex gap-2">
                    <Link
                      to={`/pdf/${pdf._id}`}
                      className="bg-blue-600 px-3 py-1 rounded"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleDelete(pdf._id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;