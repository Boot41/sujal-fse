import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ForecastCard = ({ forecast }) => {
    if (!forecast) return null;

    const chartData = forecast.forecast.map((value, index) => ({
        day: `Day ${index + 1}`,
        sales: value
    }));

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full mt-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">📊 AI Demand Forecast</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
                </LineChart>
            </ResponsiveContainer>

            <div className="mt-4">
                <div className="mb-2">
                    <span className="font-semibold">🚀 Recommended Reorder :</span>
                    <span className="text-blue-600 font-bold"> {forecast.recommended_reorder} units</span>
                </div>

                <div>
                    <span className="font-semibold">⚠️ Risk Level :</span>
                    <span className={`font-bold ml-2 px-3 py-1 rounded ${forecast.risk_level === "High" ? "bg-red-500 text-white" : forecast.risk_level === "Medium" ? "bg-yellow-500 text-white" : "bg-green-500 text-white"}`}>
                        {forecast.risk_level}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ForecastCard;
