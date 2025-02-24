import { useState } from "react";
import axios from "axios";
import { FaRobot } from "react-icons/fa";

const SalesAIInsights = () => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAIInsights = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await axios.get("http://localhost:5000/api/v1/salesai/ai-insights", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setInsights(res.data.response);
        } catch (error) {
            console.error("Error fetching AI insights:", error);
            setError("Failed to fetch AI insights. Try again later.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">AI Sales Insights</h3>
            <button 
                onClick={fetchAIInsights}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                <FaRobot /> Ask AI
            </button>

            {loading && <p className="text-gray-500 mt-3">Analyzing sales data...</p>}
            {error && <p className="text-red-500 mt-3">{error}</p>}

            {insights && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <h4 className="font-semibold text-blue-500">📊 AI Analysis:</h4>
                    <p><strong>Trends:</strong> {insights.trends}</p>
                    <p><strong>Predictions:</strong> {insights.predictions}</p>
                    <p><strong>Recommendations:</strong> {insights.recommendations}</p>
                </div>
            )}
        </div>
    );
};

export default SalesAIInsights;
