import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

const PdfViewer = () => {
  const { id } = useParams();

  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    fetchPdf();
  }, [id]);

  const fetchPdf = async () => {
    try {
      const res = await API.get(`/pdf/${id}`);
      setPdf(res.data);
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Backend:", error.response.data);
      }
    }
  };

  if (!pdf) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-orange-200 border-t-[#C2410C] rounded-full animate-spin mb-4" />
          <h1 className="text-base sm:text-lg font-semibold text-gray-700">
            Loading...
          </h1>
        </div>
      </Layout>
    );
  }

  const pdfUrl = `https://api.archivio.tech/${pdf.fileUrl}`;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/documents"
          className="inline-flex items-center gap-1.5 text-sm sm:text-base text-gray-500 hover:text-[#C2410C] transition mb-4 sm:mb-6"
        >
          ← Back to Documents
        </Link>

        <div className="bg-[#FFFDF5] rounded-3xl p-5 sm:p-8 shadow-md border border-gray-100">

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 break-words">
            {pdf.title}
          </h1>

          <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
            View your uploaded document.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#C2410C] hover:bg-[#9A3412] text-white font-semibold px-6 py-3 rounded-2xl transition text-sm sm:text-base hover:scale-105"
            >
              View PDF
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PdfViewer;