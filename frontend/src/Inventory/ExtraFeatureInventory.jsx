import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { FaDownload, FaExclamationTriangle } from "react-icons/fa";

const ExtraFeatureInventory = () => {
    const [products, setProducts] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [overstock, setOverstock] = useState([]);
    const [categoryStockData, setCategoryStockData] = useState([]);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/inventory", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data = res.data.products;
            setProducts(data);

            // Categorize stock levels
            setLowStock(data.filter(item => item.stock < item.threshold));
            setOverstock(data.filter(item => item.stock > item.overstockLimit));

            // Category-wise stock distribution
            const categoryData = {};
            data.forEach((item) => {
                if (!categoryData[item.category]) {
                    categoryData[item.category] = 0;
                }
                categoryData[item.category] += item.stock;
            });

            setCategoryStockData(Object.keys(categoryData).map(category => ({ category, stock: categoryData[category] })));
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    return (
        <div className="mt-6">

            {/* Low Stock Alerts */}
            {lowStock.length > 0 && (
                <div className="bg-red-100 p-4 rounded-lg mb-6">
                    <h3 className="text-red-600 font-semibold flex items-center gap-2">
                        <FaExclamationTriangle /> Low Stock Alert
                    </h3>
                    <ul className="list-disc pl-6">
                        {lowStock.map((item, index) => (
                            <li key={index}>{item.name} - Only {item.stock} left!</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Overstock Alerts */}
            {overstock.length > 0 && (
                <div className="bg-yellow-100 p-4 rounded-lg mb-6">
                    <h3 className="text-yellow-600 font-semibold flex items-center gap-2">
                        <FaExclamationTriangle /> Overstock Alert
                    </h3>
                    <ul className="list-disc pl-6">
                        {overstock.map((item, index) => (
                            <li key={index}>{item.name} - Overstocked with {item.stock} units!</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Category-Wise Stock Distribution */}
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-500 mb-4">Category-Wise Stock</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryStockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="stock" fill="#2563eb" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExtraFeatureInventory;