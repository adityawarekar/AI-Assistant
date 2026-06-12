import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const StudyPlan = () => {
    const { id } = useParams();

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchPlan = async () => {
        try {
            setLoading(true);
            console.log(res.data);

            const res = await API.get(
                `/pdf/studyplan/${id}`
            );



            setPlan(res.data.studyPlan);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlan();
    }, []);

    return (
        <Layout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">
                    AI Study Plan
                </h1>

                {loading && (
                    <p>Generating Study Plan...</p>
                )}

                <div className="bg-slate-800 p-6 rounded-xl mt-4">
                    <pre className="whitespace-pre-wrap">
                        {plan}
                    </pre>
                </div>
            </div>
        </Layout>
    );
};

export default StudyPlan;