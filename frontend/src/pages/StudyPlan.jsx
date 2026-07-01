import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const StudyPlan = () => {

    const [pdfs, setPdfs] = useState([]);
    const [selectedPdf, setSelectedPdf] = useState("");
    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPlan = async () => {
        if (!selectedPdf) {
            toast.error("Please select a PDF");
            return;
        }

        try {
            setLoading(true);

            const res = await API.get(
                `/pdf/studyplan/${selectedPdf}`
            );

            setPlan(res.data.studyPlan);

        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.error ||
                "Failed to generate study plan."
            );
        } finally {
            setLoading(false);
        }
    };

    const copyPlan = async () => {
        try {
            await navigator.clipboard.writeText(plan);
            toast.success("Study Plan copied successfully!");
        } catch (error) {
            toast.error("Failed to copy Study Plan.");
        }
    };

    const downloadPlan = () => {
        const blob = new Blob([plan], {
            type: "text/plain",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "Archivio-Study-Plan.txt";

        link.click();

        window.URL.revokeObjectURL(url);

        toast.success("Study Plan downloaded!");
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

    return (
        <Layout>
            <div className="space-y-6">



                <div>
                    <h1 className="text-5xl font-bold">
                        Study Plan
                    </h1>

                    <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-lg">

                        <select
                            value={selectedPdf}
                            onChange={(e) => setSelectedPdf(e.target.value)}
                            className="w-full p-4 rounded-2xl border border-gray-200 bg-white focus:outline-none focus:ring-4 focus:ring-[#C2410C]/20 focus:border-[#C2410C] mb-5"
                        >
                            <option value="">
                                Select PDF
                            </option>

                            {pdfs.map((pdf) => (
                                <option
                                    key={pdf._id}
                                    value={pdf._id}
                                >
                                    {pdf.title}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={fetchPlan}
                            disabled={!selectedPdf || loading}
                            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300
      ${!selectedPdf || loading
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-[#C2410C] text-white hover:bg-[#9A3412] hover:scale-[1.02]"
                                }`}
                        >
                            {loading ? "Generating..." : "Generate Study Plan"}
                        </button>

                    </div>

                    <p className="text-gray-500 mt-3 text-lg">
                        Personalized learning roadmap generated from your document.
                    </p>
                </div>

                {/* Loading */}

                {loading && (
                    <div className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md text-center">

                        <div className="w-12 h-12 border-4  border-orange-200 border-t-[#C2410C] rounded-full animate-spin mx-auto mb-4"></div>

                        <h3 className="font-semibold text-lg">
                            Creating Your Study Plan...
                        </h3>

                        <p className="text-gray-500 mt-2">
                            Archivio is analyzing your document and preparing a structured learning roadmap.
                        </p>

                    </div>
                )}

                {/* Empty State */}

                {!loading && !plan && (
                    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-12 shadow-lg">

                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2410C]/10 rounded-full blur-3xl"></div>

                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/5 rounded-full blur-3xl"></div>

                        <div className="relative z-10">

                            <h2 className="text-3xl font-bold">
                                Building your learning path
                            </h2>

                            <p className="mt-4 text-gray-500 max-w-2xl">
                                Your study plan will organize topics, revision goals,
                                practice sessions and milestones into a clear roadmap
                                so you know exactly what to study next.
                            </p>

                        </div>

                    </div>
                )}

                {/* Result */}

                {plan && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        className="bg-[#FFFDF5] rounded-3xl shadow-md p-8"
                    >

                        <div className="flex items-center justify-between mb-6">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    📅 Generated Study Plan
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Personalized roadmap ready.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">

                                <button
                                    onClick={copyPlan}
                                    className="bg-black text-white px-4 py-2 rounded-xl hover:scale-105 transition"
                                >
                                    Copy
                                </button>

                                <button
                                    onClick={downloadPlan}
                                    className="bg-[#C2410C] text-white px-4 py-2 rounded-xl hover:bg-[#9A3412] hover:scale-105 transition"
                                >
                                    Download
                                </button>

                            </div>

                        </div>

                        <pre className="whitespace-pre-wrap leading-8 text-gray-700 font-sans">
                            {plan}
                        </pre>

                    </motion.div>
                )}

            </div>
        </Layout>
    );
};

export default StudyPlan;