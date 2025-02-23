import { useState } from "react";
import { FaBox, FaChartBar, FaClipboardList, FaCog, FaHome } from "react-icons/fa";
import DashboardHome from "../Inventory/DashboardHome";
import InventoryInfo from "../Inventory/InventoryInfo";

const DashboardLayout = () => {
    const [activePage, setActivePage] = useState("Home");

    // Sidebar Navigation Options
    const menuItems = [
        { name: "Home", icon: <FaHome /> },
        { name: "Inventory", icon: <FaBox /> },
        { name: "Sales", icon: <FaChartBar /> },
        { name: "Reports", icon: <FaClipboardList /> },
        { name: "Settings", icon: <FaCog /> },
    ];

    return (
        <div className="flex h-screen bg-gray-100 mt-14">
            {/* Sidebar (Fixed Position) */}
            <div className="w-1/4 bg-blue-200 text-black p-6 fixed h-full">
                <h2 className="text-2xl font-bold mb-6">Retailer Dashboard</h2>
                <ul>
                    {menuItems.map((item) => (
                        <li
                            key={item.name}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-300 ${
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
            <div className="w-3/4 ml-[25%] p-6 h-screen overflow-y-auto">
                {activePage === "Home" && <DashboardHome />}
                {activePage === "Inventory" && <InventoryInfo />}
            </div>
        </div>
    );
};

export default DashboardLayout;