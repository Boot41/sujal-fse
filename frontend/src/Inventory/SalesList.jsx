import { useEffect, useState } from "react";
import axios from "axios";

const SalesList = () => {
    const [sales, setSales] = useState([]);
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [salesPerPage, setSalesPerPage] = useState(5);

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

    // Filter sales based on product name
    // Filter sales based on product name (handle null productId)
const filteredSales = sales.filter(sale =>
    sale.productId && sale.productId.name.toLowerCase().includes(filter.toLowerCase())
);


    // Pagination Logic
    const indexOfLastSale = currentPage * salesPerPage;
    const indexOfFirstSale = indexOfLastSale - salesPerPage;
    const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);

    return (
        <div className="bg-white p-5 rounded-lg shadow-md mt-6">
            <h3 className="text-lg font-semibold text-blue-500 mb-4">Sales Records</h3>
            
            {/* Search Filter */}
            <input 
                type="text" 
                className="p-2 border rounded mb-4 w-full" 
                placeholder="Search by product name..." 
                onChange={(e) => setFilter(e.target.value)}
            />

            {/* Sales Table */}
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
                    {currentSales.map((sale, index) => (
                        <tr key={index} className="border-b">
                            <td className="p-2">{sale.productId.name}</td>
                            <td className="p-2">{sale.quantitySold}</td>
                            <td className="p-2">{sale.salesChannel || "N/A"}</td>
                            <td className="p-2">{new Date(sale.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
                {/* Page Size Selector */}
                <select 
                    className="p-2 border rounded"
                    value={salesPerPage}
                    onChange={(e) => {
                        setSalesPerPage(Number(e.target.value));
                        setCurrentPage(1); // Reset to first page
                    }}
                >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={15}>15 per page</option>
                </select>

                {/* Pagination Buttons */}
                <div>
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                        Previous
                    </button>
                    
                    <span className="px-4">{currentPage}</span>

                    <button 
                        onClick={() => setCurrentPage(prev => (indexOfLastSale < filteredSales.length ? prev + 1 : prev))}
                        disabled={indexOfLastSale >= filteredSales.length}
                        className={`px-4 py-2 rounded ${indexOfLastSale >= filteredSales.length ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SalesList;
