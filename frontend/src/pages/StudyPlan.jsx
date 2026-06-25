import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import { motion } from "framer-motion";

const StudyPlan = () => {
    const { id } = useParams();

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPlan = async () => {
        try {
            setLoading(true);

            const res = await API.get(
                `/pdf/studyplan/${id}`
            );

            console.log(res.data);

            setPlan(res.data.studyPlan);

        } catch (error) {
            console.error("Error:", error);

            if (error.response) {
                console.error("Backend:", error.response.data);
            }


            alert(
                error.response?.data?.error ||
                "Failed to generate study plan."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlan();
    }, []);

    return (
        <Layout>
            <div className="space-y-6">

                {/* Header */}

                <div>
                    <h1 className="text-5xl font-bold">
                        Study Plan
                    </h1>

                    <p className="text-gray-500 mt-3 text-lg">
                        Personalized learning roadmap generated from your document.
                    </p>
                </div>

                {/* Loading */}

                {loading && (
                    <div className="bg-[#FFFDF5] p-8 rounded-3xl shadow-md text-center">

                        <div className="w-12 h-12 border-4 border-yellow-200 border-t-[#E9D66B] rounded-full animate-spin mx-auto mb-4"></div>

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

                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E9D66B]/20 rounded-full blur-3xl"></div>

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

                            <h2 className="text-2xl font-bold">
                                📅 Generated Study Plan
                            </h2>

                            <div className="bg-[#E9D66B] px-4 py-2 rounded-xl font-medium">
                                AI Powered
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