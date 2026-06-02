import { useState } from "react";
import Layout from "../components/Layout";

const Documents = () => {
  const [file, setFile] = useState(null);

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
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Upload PDF
          </button>
        </div>

        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <p className="text-gray-400">
            No documents uploaded yet
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Documents;