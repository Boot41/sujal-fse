import React from 'react';
import TechStack from '../Components/Techstack';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';
import Newsletter from '../Components/Newsletter';
// import LandingPageButtons from '../components/LandingPageButtons';

const PricingLandingPage = () => {
    return (
        <>
        
        
        <div className="flex flex-col items-center justify-center md:min-h-screen bg-white pt-36 md:pt-20 p-2 md:p-4 overflow-hidden relative">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-10 left-0 w-10 h-20 md:w-28 md:h-28 bg-gradient-to-r from-purple-400 to-pink-600 rounded-full filter blur-2xl opacity-80 animate-spin-slow"></div>
                <div className="absolute bottom-10 right-0 w-10 h-20 md:w-28 md:h-28 bg-gradient-to-r from-green-200 to-blue-600 rounded-full filter blur-2xl opacity-80 animate-spin-slow"></div>
                <div className="absolute top-0 left-0 w-28 md:w-48 h-28 md:h-48 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-28 md:w-48 h-28 md:h-48 bg-gradient-to-r from-blue-300 to-green-300 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            </div>

            {/* Main Content */}
            <main className='max-w-[1080px] h-screen flex flex-col gap-2 md:gap-10 z-10'>
                <div>
                    <h1 className="text-4xl md:text-7xl font-roboto font-extrabold text-left md:text-center text-gray-800 mb-2 md:mb-6 opacity-100 tracking-tighter pt-5">
                        Flexible Pricing for <span className="text-blue-500">Think41</span> Inventory Management
                    </h1>
                    <p className="text-md md:text-[20px] text-start md:text-center text-gray-500 font-extrabold font-mulsih mb-2 md:mb-8">
                        Choose a pricing plan that fits your business needs. Get AI-powered inventory insights, real-time stock alerts and lot more.
                    </p>
                </div>

                {/* Pricing Plans */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Plan */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300">
                        <h2 className="text-2xl font-bold text-blue-500">Basic</h2>
                        <p className="text-gray-700 mt-2">Perfect for small businesses.</p>
                        <p className="text-3xl font-extrabold text-gray-800 mt-4">$0<span className="text-lg">/month</span></p>
                        <ul className="mt-4 text-gray-600 space-y-2">
                            <li>✅ AI Demand Forecasting</li>
                            <li>✅ Low Stock Alerts</li>
                            <li>✅ Basic Reports</li>
                        </ul>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-blue-500 transform scale-105">
                        <h2 className="text-2xl font-bold text-orange-500">Pro</h2>
                        <p className="text-gray-700 mt-2">For growing businesses.</p>
                        <p className="text-3xl font-extrabold text-gray-800 mt-4">$19.99<span className="text-lg">/month</span></p>
                        <ul className="mt-4 text-gray-600 space-y-2">
                            <li>✅ Everything in Basic</li>
                            <li>✅ AI Chatbot Assistance</li>
                            <li>✅ Advanced Sales & Inventory Reports</li>
                            <li>✅ Excel & Tally Integration</li>
                        </ul>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300">
                        <h2 className="text-2xl font-bold text-green-500">Enterprise</h2>
                        <p className="text-gray-700 mt-2">For large-scale operations.</p>
                        <p className="text-3xl font-extrabold text-gray-800 mt-4">Custom Pricing</p>
                        <ul className="mt-4 text-gray-600 space-y-2">
                            <li>✅ Everything in Pro</li>
                            <li>✅ AI-Based Smart Recommendations</li>
                            <li>✅ Custom Integrations & Support</li>
                            <li>✅ Personalized AI Insights</li>
                        </ul>
                    </div>
                </div>
            </main>
            
            
        </div>
        <TechStack/>
        <Newsletter/>
            <FAQ/>
        <Footer/>
        </>
    );
};

export default PricingLandingPage;
