import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const StudyPlan = () => {
    const { id } = useParams();

    const [plan, setPlan] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPlan = async () => {
        try {
            setLoading(true);

            const res = await API.get(
                `/pdf/studyplan/${id}`
            );
            


            setPlan(res.data);
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

                <div className="space-y-4">
                    <p className="text-white text-xl">
                        Total Plans: {plan.length}
                    </p>

                    {plan.map((day, index) => (
                        <div
                            key={index}
                            className="bg-slate-800 p-5 rounded-xl"
                        >
                            <h2 className="text-xl font-bold mb-3">
                                {day.day}
                            </h2>

                            <ul className="list-disc ml-5">
                                {day.topics.map(
                                    (topic, i) => (
                                        <li key={i}>
                                            {topic}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default StudyPlan;