import React, { useState, useEffect } from "react";
import useAIForecast from "../hook/useAIForecast";
import ForecastCard from "../AiForecast/ForecastCard";
import { FaSearch } from "react-icons/fa";

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
        <div className="p-6 min-h-screen flex flex-col items-center bg-gray-100">
            {/* Page Title */}
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">
                🔮 AI Demand Forecasting
            </h1>

            {/* Glassmorphism Card Container */}
            <div className="bg-white/80 backdrop-blur-lg shadow-lg p-6 rounded-xl w-full max-w-2xl flex justify-center flex-col md:flex-row items-center gap-6 border border-gray-200">
                {/* Product Dropdown */}
                <div className="flex flex-col  gap-2 w-full">
                <label className="text-gray-700 font-semibold">Select Product</label>
                    <div className="relative w-full flex flex-row gap-5">
                        <select
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            className="border p-3 rounded-lg w-full bg-white shadow-sm text-gray-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        >
                            <option value="">Choose a Product</option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>

                        {/* Forecast Button */}
                        <button
                            onClick={handleFetchForecast}
                            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-semibold tracking-wide text-white transition-all duration-300 ease-out rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!productId || loading}
                        >
                    {/* Animated Background Effect */}
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>

                    {/* Icon & Text */}
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="white" d="M4 12a8 8 0 0116 0h2A10 10 0 004 12z"></path>
                            </svg>
                            Fetching...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <FaSearch className="w-5 h-5" /> Forecast
                        </span>
                    )}
                </button>
                    </div>
                </div>

                
            </div>

            {/* Display Errors or Forecast Data */}
            <div className="mt-8 w-full max-w-3xl">
                {error && (
                    <p className="text-red-600 text-center bg-red-100 p-3 rounded-lg shadow-md">
                        ❌ {error}
                    </p>
                )}
                {forecastData && <ForecastCard forecast={forecastData} />}
            </div>
        </div>
    );
};

export default ForecastDashboard;
