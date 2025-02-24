import React from 'react';
import { Link } from 'react-router-dom';
import Think41Inventory from "../assets/Think41Inventory.jpeg";

const Footer = () => {
  // Function to scroll to the top on link click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t-2 border-gray-300 bg-white py-12">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:justify-between">
          {/* Left Section - Logo & About */}
          <div className="mb-8 md:mb-0">
            <div className='flex items-center text-2xl font-bold'>
              <img className="h-10 w-auto mr-2" src={Think41Inventory} alt="Company Logo" />
              <span className='text-orange-500'>Think41 Inventory</span>
            </div>
            <p className="mt-4 text-gray-800 font-medium">
              Revolutionizing inventory management with AI-driven efficiency and precision.
            </p>
          </div>

          {/* Middle Section - Navigation Links */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/about" onClick={scrollToTop} className="text-base text-gray-500 hover:text-gray-800">About Us</Link></li>
                <li><Link to="/pricing" onClick={scrollToTop} className="text-base text-gray-500 hover:text-gray-800">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Support</h3>
              <ul className="mt-4 space-y-4">
                <li><Link to="/contactus" onClick={scrollToTop} className="text-base text-gray-500 hover:text-gray-800">Contact Us</Link></li>
                <li><Link to="/faq" onClick={scrollToTop} className="text-base text-gray-500 hover:text-gray-800">FAQs</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright & Socials */}
        <div className="mt-8 border-t border-gray-300 pt-8 flex items-center justify-between">
          <p className="text-sm text-gray-600">&copy; 2025 Think41 Inventory, Inc. All rights reserved.</p>
          
          <div className="flex space-x-6">
            <Link to="#" onClick={scrollToTop} className="text-gray-500 hover:text-blue-600">
              <i className="fab fa-facebook-f text-lg"></i>
            </Link>
            <Link to="#" onClick={scrollToTop} className="text-gray-500 hover:text-blue-400">
              <i className="fab fa-twitter text-lg"></i>
            </Link>
            <Link to="#" onClick={scrollToTop} className="text-gray-500 hover:text-pink-500">
              <i className="fab fa-instagram text-lg"></i>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
