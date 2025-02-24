import { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const SalesChart = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/sales", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const formattedData = res.data.sales.map(sale => ({
                date: new Date(sale.date).toLocaleDateString(),
                revenue: sale.productId?.price * sale.quantitySold || 0 // ✅ Ensured revenue calculation
            }));

            setSalesData(formattedData);
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={salesData}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stroke="#f97316" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
