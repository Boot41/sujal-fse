import { useEffect, useState } from "react";
import axios from "axios";
import { FaBox, FaChartLine, FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,BarChart,Bar } from "recharts";
import SalesChart from "./SalesChart";

const DashboardHome = () => {
    const [userName, setUserName] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [ordersProcessed, setOrdersProcessed] = useState(0);
    const [lowStockAlerts, setLowStockAlerts] = useState(0);
    const [salesData, setSalesData] = useState([]);
    const [categoryWiseSales, setCategoryWiseSales] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch user details
                const userRes = await axios.get("http://localhost:5000/api/v1/auth/userinfo", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUserName(userRes.data.user.name);

                // Fetch inventory data
                const inventoryRes = await axios.get("http://localhost:5000/api/v1/inventory", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setTotalProducts(inventoryRes.data.products.length);

                // Fetch sales data
                const salesRes = await axios.get("http://localhost:5000/api/v1/sales", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });

                const sales = salesRes.data.sales;
                setOrdersProcessed(sales.length);

                // Calculate revenue
                // Calculate revenue safely
const revenue = sales.reduce((acc, sale) => {
    return sale.productId && sale.productId.price
        ? acc + sale.productId.price * sale.quantitySold
        : acc;
}, 0);

setTotalRevenue(revenue.toFixed(2));



                // Fetch low stock alerts
                const lowStock = inventoryRes.data.products.filter((item) => item.stock < item.threshold).length;
                setLowStockAlerts(lowStock);

                // Prepare sales data for graph
                const formattedSalesData = sales.map((sale) => ({
                    date: new Date(sale.date).toLocaleDateString(),
                    revenue: sale.revenue
                }));
                setSalesData(formattedSalesData);

                // Prepare category-wise sales data
                const categorySales = {};
                inventoryRes.data.products.forEach((item) => {
                    if (!categorySales[item.category]) {
                        categorySales[item.category] = 0;
                    }
                    categorySales[item.category] += item.stock;
                });

                setCategoryWiseSales(
                    Object.keys(categorySales).map((category) => ({
                        category,
                        stock: categorySales[category]
                    }))
                );
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div>
            {/* Welcome Message */}
            <h1 className="text-3xl font-bold mb-4 text-blue-500">Hello, {userName} 👋</h1>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-orange-500">
                    <FaBox className="text-orange-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Products</h3>
                        <p className="text-2xl font-bold text-blue-500">{totalProducts}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-orange-500">
                <FaChartLine className="text-orange-500 text-4xl" />
                <div>
                    <h3 className="text-lg font-semibold">Total Revenue</h3>
                    <p className="text-2xl font-bold">₹{totalRevenue}</p>
                </div>
            </div>

                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-orange-500">
                    <FaShoppingCart className="text-orange-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Orders Processed</h3>
                        <p className="text-2xl font-bold text-blue-500">{ordersProcessed}</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg shadow-md flex items-center gap-4 border-l-4 border-red-500">
                    <FaExclamationTriangle className="text-red-500 text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Low Stock Alerts</h3>
                        <p className="text-2xl font-bold text-red-500">{lowStockAlerts}</p>
                    </div>
                </div>
            </div>

            {/* Sales Trend Graph */}
            {/* <div className="bg-white p-5 rounded-lg shadow-md mb-6">
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
</div> */}
<SalesChart/>
            {/* Category-Wise Stock Bar Chart */}
            <div className="bg-white p-5 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-500 mb-4">Category-Wise Stock</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryWiseSales}>
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

export default DashboardHome;