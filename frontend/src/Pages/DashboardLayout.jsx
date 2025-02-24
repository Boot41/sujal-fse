import { useState } from "react";
import { FaBox, FaChartBar, FaClipboardList, FaHome } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";
import DashboardHome from "../Inventory/DashboardHome";
import InventoryInfo from "../Inventory/InventoryInfo";
import Chatbot from "../Components/Chatbot";
import SalesDashboard from "../Inventory/SalesDashboard";
import Reports from "../Reports/Reports";
import ForecastDashboard from "../Inventory/ForecastDashboard";

const DashboardLayout = () => {
    const [activePage, setActivePage] = useState("Home");

    // Sidebar Navigation Options
    const menuItems = [
        { name: "Home", icon: <FaHome /> },
        { name: "Inventory", icon: <FaBox /> },
        { name: "Sales", icon: <FaChartBar /> },
        { name: "Reports", icon: <FaClipboardList /> },
        { name: "AiForecast", icon: <VscRobot /> },
    ];

    return (
      <div className="relative">
 <div className="flex h-screen bg-gray-100 mt-14">
            {/* Sidebar (Fixed Position) */}
            <div className="w-1/5 bg-blue-200 text-black p-6 fixed h-full">
                <h2 className="text-2xl font-bold mb-6">Retailer Dashboard</h2>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex items-center gap-6 my-2 p-3 rounded-lg cursor-pointer hover:bg-blue-300 ${
                                activePage === item.name ? "bg-blue-500" : ""
                            }`}
                            onClick={() => setActivePage(item.name)}
                        >
                            {item.icon} {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Content Area (Scrollable) */}
            <div className="w-3/2 ml-[20%] p-6 h-screen overflow-y-auto">
                {activePage === "Home" && <DashboardHome />}
                {activePage === "Inventory" && <InventoryInfo />}
                {activePage === "Sales" && <SalesDashboard />}
                {activePage === "Reports" && <Reports />}
                {activePage === "AiForecast" && <ForecastDashboard />}
            </div>
        </div>

        <Chatbot/>
      </div>
       
    );
};

export default DashboardLayout;