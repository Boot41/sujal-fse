import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";
import FAQ from "../Components/FAQ";
import WhatWeDo from "../Components/WhatWeDo";
import OurWork from "../Components/OurWork";
import { useAuth } from "../store/auth";

const Home = () => {

  const {user} = useAuth();
  return (
    <>
      <div className="relative flex flex-col items-center justify-center md:min-h-screen bg-white pt-36 md:pt-20 p-2 md:p-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Abstract Gradient Shapes */}
          <div className="absolute top-10 left-0 w-10 h-20 md:w-28 md:h-28 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full filter blur-2xl opacity-80 animate-spin-slow"></div>
          <div className="absolute bottom-10 right-0 w-10 h-20 md:w-28 md:h-28 bg-gradient-to-r from-green-200 to-blue-600 rounded-full filter blur-2xl opacity-80 animate-spin-slow"></div>
          <div className="absolute top-0 left-0 w-28 md:w-48 h-28 md:h-48 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-28 md:w-48 h-28 md:h-48 bg-gradient-to-r from-blue-300 to-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        </div>

        {/* Main Content */}
        <main className="max-w-[1080px] flex flex-col gap-6 md:gap-6 z-10 text-center">
          {/* Title Animation */}
          <motion.h1
            className="text-4xl md:text-[85px] font-extrabold text-orange-500"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Think41 <span className="text-[#4c52e6]">Inventory Management System</span>
          </motion.h1>

          {/* Catchy Tagline */}
          <motion.p
            className="text-md md:text-xl text-gray-700 font-semibold leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            The <span className="text-orange-500 font-bold">#1 AI-Powered</span> solution for retailers to  
            track, organize, and optimize inventory with ease.
          </motion.p>

          {/* Buttons with Animation */}
          <motion.div
            className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >

            {
              user ?<Link
              to="/dashboard"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:scale-105"
            >
              Explore Dashboard 🚀
            </Link> : <Link
              to="/signin"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300 shadow-lg hover:scale-105"
            >
              Explore Dashboard 🚀
            </Link>
            }
            
            <Link
              to="/pricing"
              className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 shadow-lg hover:scale-105"
            >
              Subscription Model
            </Link>
          </motion.div>
        </main>
      </div>

      <WhatWeDo/>
      <OurWork/>
      <FAQ/>
      <Footer />
    </>
  );
};

export default Home;
