import React from 'react';

const Home = () => {
    return (
        <div className="max-w-[900px] mx-auto flex flex-col items-center justify-center h-screen px-4 sm:px-0">
            <h1 className="text-5xl sm:text-7xl font-bold text-orange-500 text-center">Think41 Inventory Management System</h1>
            <p className="mt-4 text-lg sm:text-xl text-gray-700 font-medium text-center">
                A comprehensive solution for managing your inventory efficiently.
                <br />
                Track, organize, and optimize your stock with ease.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href="/dashboard" className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition duration-300">Go to Dashboard</a>
                <a href="/subscription" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition duration-300">Subscription Model</a>
            </div>
        </div>
    );
};

export default Home;