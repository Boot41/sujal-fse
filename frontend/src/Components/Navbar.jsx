import React, { useState } from 'react';
import logo from "../assets/Think41Inventory.jpeg" // Adjust the path as necessary

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="max-w-[900px] mx-auto bg-white ">
            <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">

            <div className='flex items-end'>
    <img src={logo} alt="Inventory Logo" className="h-8" />
    <h1 className='text-xl font-bold text-orange-500'>Inventory</h1>
</div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                        {isOpen ? '✖' : '☰'}
                    </button>
                </div>
                <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:flex md:space-x-10 md:translate-x-0`}>
                    <div className="flex flex-col md:flex-row md:space-x-5 p-4">
                        <a href="/" className="text-gray-700 hover:text-orange-500">Home</a>
                        <a href="/about" className="text-gray-700 hover:text-orange-500">About</a>
                        <a href="/pricing" className="text-gray-700 hover:text-orange-500">Pricing</a>
                        <a href="/dashboard" className="text-gray-700 hover:text-orange-500">Dashboard</a>

                    </div>
                </div>

                <div className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:flex md:space-x-5 md:translate-x-0`}>
                    <a href="/register" className="text-gray-700 hover:text-orange-500">Register</a>
                    <a href="/login" className="text-gray-700 hover:text-orange-500">Login</a>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
