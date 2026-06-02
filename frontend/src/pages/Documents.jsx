import Layout from "../components/Layout";

const Documents = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            My Documents
          </h1>

          <p className="text-gray-500 mt-2">
            Upload and manage your study materals
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-b-lg">
          Upload PDF
        </button>
        <div className="bg-slate-800 rounded-xl p-8 text-center">
          <p className="text-gray-400">
            No documents Uploaded yet
          </p>
        </div>
      </div>
      
    </Layout>
  );
};

export default Documents;