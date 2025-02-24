import { useEffect, useState } from "react";
import axios from "axios";

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        fetchSales();
    }, []);

    const fetchSales = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/sales", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setSales(res.data.sales);
        } catch (error) {
            console.error("Error fetching sales:", error);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">Sales Records</h3>
            
            <input 
                type="text" 
                className="p-2 border rounded mb-4 w-full" 
                placeholder="Search by product name..." 
                onChange={(e) => setFilter(e.target.value)}
            />

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="p-2">Product</th>
                        <th className="p-2">Quantity Sold</th>
                        <th className="p-2">Sales Channel</th>
                        <th className="p-2">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                        .filter(sale => sale.productId.name.toLowerCase().includes(filter.toLowerCase()))
                        .map((sale, index) => (
                            <tr key={index} className="border-b">
                                <td className="p-2">{sale.productId.name}</td>
                                <td className="p-2">{sale.quantitySold}</td>
                                <td className="p-2">{sale.salesChannel || "N/A"}</td>
                                <td className="p-2">{new Date(sale.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesList;
