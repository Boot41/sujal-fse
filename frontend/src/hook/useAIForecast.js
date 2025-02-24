import { useState } from "react";

const useAIForecast = () => {
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchForecast = async (productId) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token"); // Assuming JWT authentication
            const response = await fetch(`http://localhost:5000/api/v1/ai/forecast?productId=${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to fetch forecast");

            setForecastData(data.forecast);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { forecastData, loading, error, fetchForecast };
};

export default useAIForecast;
