import { useParams } from "react-router-dom";
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
      console.log(error);
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

        <a
          href={pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center bg-[#E9D66B] hover:bg-[#dcc85d] text-black font-semibold px-6 py-3 rounded-2xl transition"
        >
          View PDF
        </a>

      </div>
    </div>
  );
};

export default PdfViewer;