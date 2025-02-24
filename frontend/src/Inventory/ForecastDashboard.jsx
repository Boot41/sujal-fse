import React, { useState, useEffect } from "react";
import useAIForecast from "../hook/useAIForecast";
import ForecastCard from "../AiForecast/ForecastCard";

const ForecastDashboard = () => {
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const { forecastData, loading, error, fetchForecast } = useAIForecast();

    // Fetch all products when component loads
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:5000/api/v1/inventory", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                if (response.ok) setProducts(data.products);
                else console.error("Failed to fetch products");
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProducts();
    }, []);

    const handleFetchForecast = () => {
        if (productId) fetchForecast(productId);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">🔮 AI Demand Forecasting</h1>

            <div className="mb-4 flex gap-4 items-center">
                <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="border p-2 rounded-md w-64 bg-white"
                >
                    <option value="">Select Product</option>
                    {products.map((product) => (
                        <option key={product._id} value={product._id}>
                            {product.name}
                        </option>
                    ))}
                </select>

                <button
                    onClick={handleFetchForecast}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    disabled={!productId || loading}
                >
                    {loading ? "Fetching..." : "Get Forecast"}
                </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {forecastData && <ForecastCard forecast={forecastData} />}
        </div>
    );
};

export default ForecastDashboard;
