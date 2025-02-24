import { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaChartLine, FaBox, FaPlus } from "react-icons/fa";
import SalesList from "./SalesList";
import SalesChart from "./SalesChart";
import LogSaleModal from "./LogSaleModal";

const SalesDashboard = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [mostSoldProduct, setMostSoldProduct] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchSalesOverview();
    }, []);

    const fetchSalesOverview = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/v1/sales", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const sales = res.data.sales;
            setTotalSales(sales.length);

            const revenue = sales.reduce((acc, sale) => acc + sale.productId.price * sale.quantitySold, 0);
            setTotalRevenue(revenue.toFixed(2));

            const productCount = {};
            sales.forEach(sale => {
                productCount[sale.productId.name] = (productCount[sale.productId.name] || 0) + sale.quantitySold;
            });

            const bestSeller = Object.keys(productCount).reduce((a, b) => productCount[a] > productCount[b] ? a : b, "");
            setMostSoldProduct(bestSeller);
        } catch (error) {
            console.error("Error fetching sales overview:", error);
        }
    };

    return (
        <div className="p-6">
            {/* Sales Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-blue-500">
                    <FaShoppingCart className="text-blue-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Sales</h3>
                        <p className="text-2xl font-bold">{totalSales}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-orange-500">
                    <FaChartLine className="text-orange-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Revenue</h3>
                        <p className="text-2xl font-bold">₹{totalRevenue}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-green-500">
                    <FaBox className="text-green-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Top Selling Product</h3>
                        <p className="text-xl font-semibold">{mostSoldProduct || "N/A"}</p>
                    </div>
                </div>
            </div>

            {/* Log Sale Button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                >
                    <FaPlus /> Log Sale
                </button>
            </div>

            {/* Log Sale Modal */}
            <LogSaleModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSaleLogged={fetchSalesOverview}
            />

            {/* Sales List and Chart */}
            <SalesList />

            <br />
            <SalesChart />
        </div>
    );
};

export default SalesDashboard;
