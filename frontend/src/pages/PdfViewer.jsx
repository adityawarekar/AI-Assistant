import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PdfViewer = () => {
  const { id } = useParams();

  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    fetchPdf();
  }, []);

  const fetchPdf = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/pdf/${id}`
      );

      setPdf(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!pdf) {
    return <h1>Loading...</h1>;
  }


  const pdfUrl = `http://localhost:5001/${pdf.fileUrl}`;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {pdf.title}
      </h1>

      <a
        href={pdfUrl}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 px-4 py-2 rounded text-white"
      >
        Open PDF
      </a>
    </div>
  );
};

export default PdfViewer;