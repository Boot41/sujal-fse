import React, { useState } from "react";
import axios from "axios";
import { FaFilePdf, FaFileExcel, FaFileAlt } from "react-icons/fa";
import ReportCard from "../Reports/ReportCard";

const Reports = () => {
    const [loading, setLoading] = useState({ pdf: false, excel: false, tally: false, insights: false });
    const [aiInsights, setAiInsights] = useState(null);
    const [error, setError] = useState("");

    const generateReport = async (type) => {
        setLoading((prev) => ({ ...prev, [type]: true }));
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/report/${type}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                responseType: "blob",
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `business-report.${type === "pdf" ? "pdf" : "xlsx"}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Error generating ${type} report:`, error);
        }
        setLoading((prev) => ({ ...prev, [type]: false }));
    };

    const generateTallyFile = async () => {
        setLoading((prev) => ({ ...prev, tally: true }));
        try {
            const response = await axios.get("http://localhost:5000/api/v1/tally/generate-financial-tally", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                responseType: "blob",
            });
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "financial-tally.xml");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error generating Tally file:", error);
        }
        setLoading((prev) => ({ ...prev, tally: false }));
    };

    const fetchAIInsights = async () => {
        setLoading((prev) => ({ ...prev, insights: true }));
        setError("");

        try {
            const response = await axios.get("http://localhost:5000/api/v1/salesai/ai-insights", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            if (response.data?.response) {
                setAiInsights(response.data.response);
            } else {
                setError("AI insights could not be loaded.");
            }
        } catch (error) {
            console.error("Error fetching AI insights:", error);
            setError("Failed to fetch AI insights. Please try again later.");
        }
        setLoading((prev) => ({ ...prev, insights: false }));
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-blue-500">Reports & Analytics 📊</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportCard
                    title="Download PDF Report"
                    icon={<FaFilePdf size={24} />}
                    color="bg-red-500 hover:bg-red-600"
                    loading={loading.pdf}
                    onClick={() => generateReport("pdf")}
                />
                <ReportCard
                    title="Download Excel Report"
                    icon={<FaFileExcel size={24} />}
                    color="bg-green-500 hover:bg-green-600"
                    loading={loading.excel}
                    onClick={() => generateReport("excel")}
                />
                <ReportCard
                    title="Download Tally Report"
                    icon={<FaFileAlt size={24} />}
                    color="bg-blue-500 hover:bg-blue-600"
                    loading={loading.tally}
                    onClick={generateTallyFile}
                />
            </div>

            {/* AI Insights Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-blue-500 mb-4">AI-Powered Sales Insights</h3>
                <button 
                    onClick={fetchAIInsights} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    disabled={loading.insights}
                >
                    {loading.insights ? "Fetching Insights..." : "Get AI Insights"}
                </button>

                {error && <p className="text-red-500 mt-3">{error}</p>}

                {aiInsights && (
                    <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                        <p><strong>📊 Trends:</strong> {aiInsights.trends}</p>
                        <p><strong>🔮 Predictions:</strong> {aiInsights.predictions}</p>
                        <p><strong>💡 Recommendations:</strong> {aiInsights.recommendations}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
