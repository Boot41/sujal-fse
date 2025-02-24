import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx"; // Import auth context
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaBox, FaEnvelope, FaStore } from "react-icons/fa";
import axios from "axios";

const UserInfo = () => {
    const { user, isTokenAvailable, logOutUser } = useAuth(); 
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        businessType: "",
        totalProducts: 0,
    });

    useEffect(() => {
        if (user) {
            setUserInfo({
                name: user.name,
                email: user.email,
                businessType: user.businessType,
            });
        }
        
        // Fetch total products
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/inventory", {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setUserInfo((prev) => ({ ...prev, totalProducts: res.data.products.length }));
            } catch (error) {
                console.error("Error fetching product count:", error);
            }
        };
        fetchProducts();
    }, [user]);

    const handleLogout = () => {
        logOutUser();
        navigate("/"); // Redirect to home page after logout
    };

    return (
        <div className="max-w-[850px] mx-auto p-6 bg-white shadow-lg rounded-xl mt-20 w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Retailer Profile</h2>
                {isTokenAvailable && (
                    <button
                        onClick={handleLogout}
                        className="rounded relative inline-flex group items-center justify-center px-4 py-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white"
                    >
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">Log Out</span>
                        <IoIosArrowRoundForward className="text-[30px] pt-[3px]" />
                    </button>
                )}
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-6 mb-6">
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s" // Replace with actual placeholder image URL
                    alt="Retailer Profile"
                    className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
                />
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800">{userInfo.name || "N/A"}</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                        <FaEnvelope className="text-blue-500" /> {userInfo.email || "N/A"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                        <FaStore className="text-orange-500" /> {userInfo.businessType || "N/A"}
                    </p>
                </div>
            </div>

            {/* Store Overview */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
                    <FaBox className="text-blue-500 text-2xl" />
                    <div>
                        <p className="text-lg font-semibold">Total Products</p>
                        <p className="text-xl font-bold">{userInfo.totalProducts}</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4">
                    <FaStore className="text-green-500 text-2xl" />
                    <div>
                        <p className="text-lg font-semibold">Store Type</p>
                        <p className="text-xl font-bold">{userInfo.businessType || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;