import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Think41Inventory.jpeg"; // Adjust the path as needed
import { FaBars } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useAuth } from "../store/auth.jsx"; // Import authentication context

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const { isTokenAvailable } = useAuth(); // Get user data from auth context
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setIsOpen(false); // Close mobile menu on link click
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToTop = () => window.scrollTo({ top: 0 });

    return (
        <nav className="bg-white fixed w-full top-0 z-50 shadow-sm">
            <div className="max-w-[900px] mx-auto px-4 flex justify-between items-center h-16">

                {/* Logo */}
                <Link to="/" className="flex items-center" onClick={() => handleLinkClick("home")}>
                    <img className="h-6 w-6 md:h-10 md:w-10 cursor-pointer" src={logo} alt="Logo" />
                    <span className="text-xl md:text-2xl font-semibold text-orange-500 ml-1 ">Inventory</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-5 text-[16px] font-medium">
                    <Link
                        to="/"
                        className={`text-gray-800 hover:text-[#FF7D29] transition-all duration-200 ${activeLink === "home" ? "bg-orange-100 text-orange-500 rounded-md px-2" : ""}`}
                        onClick={() => handleLinkClick("home")}
                    >
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className={`text-gray-800 hover:text-[#FF7D29] transition-all duration-200 ${activeLink === "about" ? "bg-orange-100 text-orange-500 rounded-md px-2" : ""}`}
                        onClick={() => handleLinkClick("about")}
                    >
                        About
                    </Link>
                    <Link
                        to="/pricing"
                        className={`text-gray-800 hover:text-[#FF7D29] transition-all duration-200 ${activeLink === "pricing" ? "bg-orange-100 text-orange-500 rounded-md px-2" : ""}`}
                        onClick={() => handleLinkClick("pricing")}
                    >
                        Pricing
                    </Link>
                    {/* 🔒 Dashboard - Redirect to Sign In if user is not logged in */}
                    <Link
                        to={isTokenAvailable ? "/dashboard" : "/signin"}
                        className={`text-gray-800 hover:text-[#FF7D29] transition-all duration-200 ${activeLink === "dashboard" ? "bg-orange-100 text-orange-500 rounded-md px-2" : ""}`}
                        onClick={() => handleLinkClick("dashboard")}
                    >
                        Dashboard
                    </Link>
                </div>

                {/* Profile Section & Mobile Menu */}
                <div className="flex items-center space-x-3">
                    {isTokenAvailable ? (
                        <Link to="/userinfo" onClick={scrollToTop}>
                            <img src={"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg"} alt="User profile image" className='rounded-full h-10 w-10' />
                        </Link>
                    ) : (
                        <Link to="/signin" onClick={scrollToTop} className="rounded relative inline-flex group items-center justify-center px-3 py-[3px] m-1 cursor-pointer border-b-4 border-l-2 active:border-orange-600 active:shadow-none shadow-lg bg-gradient-to-tr from-orange-600 to-orange-500 border-orange-700 text-white">
                            <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                            <span className="relative">Sign In</span>
                            <IoIosArrowRoundForward className='text-[30px] pt-[3px]' />
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button onClick={toggleMenu} className="md:hidden text-gray-800 hover:text-gray-600">
                        <FaBars size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
