import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx"; // Import auth context
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const UserInfo = () => {
    const { user, isTokenAvailable, logOutUser } = useAuth(); 
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        businessType: ""
    });

    useEffect(() => {
        if (user) {
            setUserInfo({
                name: user.name,
                businessType: user.businessType
            });
        }
    }, [user]);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const handleLogout = () => {
        logOutUser();
        navigate("/"); // Redirect to home page after logout
    };

    return (
        <div className="max-w-[800px] mx-auto p-6 bg-white shadow-lg rounded-xl mt-20 w-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700">User Information</h2>
                
                {/* Logout Button (Right Aligned) */}
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

            {/* User Information */}
            <div className="text-gray-800 space-y-3">
                <p className="text-lg">
                    <span className="font-semibold text-gray-600">Name:</span> {capitalizeFirstLetter(userInfo.name) || "N/A"}
                </p>
                <p className="text-lg">
                    <span className="font-semibold text-gray-600">Business Type:</span> {capitalizeFirstLetter(userInfo.businessType) || "N/A"}
                </p>
            </div>
        </div>
    );
};

export default UserInfo;
