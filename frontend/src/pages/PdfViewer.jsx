import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

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
      <div className="p-6">
        <h1>Loading...</h1>
      </div>
    );
  }

  const pdfUrl = `http://localhost:5001/${pdf.fileUrl}`;

  return (
    <div className="p-8">
      <div className="bg-[#FFFDF5] rounded-3xl p-8 shadow-md border border-gray-100">

        <h1 className="text-3xl font-bold text-black mb-2">
          {pdf.title}
        </h1>

        <p className="text-gray-500 mb-8">
          View your uploaded document.
        </p>

        <div className="flex gap-3">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center bg-[#C2410C] hover:bg-[#9A3412] text-black font-semibold px-6 py-3 rounded-2xl transition"
          >
            View PDF
          </a>

        </div>
      </div>
    </div>
  );
};

export default PdfViewer;