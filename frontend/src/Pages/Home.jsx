import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-[800px] w-full text-center mx-auto">
        {/* Title Animation */}
        <motion.h1
          className="text-5xl sm:text-7xl font-extrabold text-orange-500 "
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Think41 <span className="text-[#4c52e6]">Inventory Management System</span>
        </motion.h1>

        {/* Catchy Tagline */}
        <motion.p
          className="mt-5 text-lg sm:text-[22px] text-gray-700 font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          The <span className="text-orange-500 font-semibold">#1 AI-Powered</span> solution for retailers to
          <br /> track, organize, and optimize inventory with ease.
        </motion.p>

        {/* Buttons with Animation */}
        <motion.div
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="/dashboard"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:scale-105"
          >
            Explore Dashboard 🚀
          </a>
          <a
            href="/pricing"
            className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 shadow-lg hover:scale-105"
          >
            Subscription Model
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
