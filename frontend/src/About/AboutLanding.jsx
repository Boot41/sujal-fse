import React from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';

const AboutLanding = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }
    const { user } = useAuth();

    return (
        <section className='md:h-screen h-[1300px] relative dark:text-white duration-300 w-full text-center'>

            <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 pt-20">
                
                {/* Left Content */}
                <div className='text-start w-full md:w-[60%] text-black'>
                    <h1 className="text-[14px] md:text-[17px] font-bold text-start mb-4 flex gap-1">
                        ~ Welcome,  
                        {user ? (
                            <span className="text-blue-500 dark:text-blue-500 flex gap-1 duration-300">
                                {` ${user.name}`} 
                            </span>
                        ) : (
                            <span className="text-blue-500 dark:text-blue-500 duration-300">
                                to our AI-powered system
                            </span>
                        )}
                    </h1>

                    <h2 className='text-2xl md:text-5xl text-blue-500 font-montserrat font-extrabold mt-1 md:mt-4'>
                        AI-Driven Inventory Management
                    </h2>

                    <p className="text-gray-800 text-[16px] md:text-[17px] mb-4 mt-2 md:mt-6 text-start md:text-justify font-monts duration-300">
                        Think41 helps retailers track, optimize, and forecast inventory using AI-powered insights. Prevent stockouts, manage overstocking, and make data-driven business decisions—all from a single intelligent dashboard.
                    </p>

                    {/* Key Features Section */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-3 md:mt-8'>
                        <div className='flex flex-row text-left gap-2'>
                            <img src="https://static-00.iconduck.com/assets.00/rocket-emoji-2048x2048-sykv2c0e.png" alt="" className='w-16 h-16 object-cover mb-2 pt-1' />
                            <div>
                                <h1 className='font-bold font-karla'>AI Demand Forecasting</h1>
                                <p className='text-gray-700 text-[13px] duration-300 hidden md:block'>
                                    Predict future inventory demand using AI-powered insights.
                                </p>
                            </div>
                        </div>

                        <div className='flex text-left gap-2'>
                            <img src="https://static-00.iconduck.com/assets.00/rocket-emoji-2048x2048-sykv2c0e.png" alt="" className='w-16 h-16 object-cover mb-2' />
                            <div>
                                <h1 className='font-bold font-karla'>Automated Stock Alerts</h1>
                                <p className='text-gray-700  text-[13px] duration-300 hidden md:block'>
                                    Get real-time alerts for low stock, overstocking & stockouts.
                                </p>
                            </div>
                        </div>

                        <div className='flex text-left gap-2'>
                            <img src="https://static-00.iconduck.com/assets.00/rocket-emoji-2048x2048-sykv2c0e.png" alt="" className='w-16 h-16 object-cover mb-2' />
                            <div>
                                <h1 className='font-bold font-karla'>Seamless Tally & Excel Sync</h1>
                                <p className='text-gray-700  text-[13px] duration-300 hidden md:block'>
                                    Sync inventory with Tally & Excel for real-time tracking.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action Button */}
                    <div className='mt-2 md:mt-10'>
                        <Link 
                            to='/dashboard' 
                            onClick={handleClick} 
                            className="relative inline-flex items-center justify-center p-4 px-9 md:px-14 py-2 md:py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group"
                        >
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
                                    </path>
                                </svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-slate-900 transition-all duration-300 transform group-hover:translate-x-full ease">
                                Explore Dashboard
                            </span>
                            <span className="relative invisible">Button Text</span>
                        </Link>
                    </div>
                </div>

                {/* Right Side - Image Section */}
                <div className='w-full md:w-[30%] mt-8 md:mt-0 relative pt-1 md:pt-10'>
                    <img 
                        src="https://img.freepik.com/free-photo/robot-with-several-shipping-boxes_1048-2919.jpg?t=st=1740393264~exp=1740396864~hmac=25c86c38ecfbd0de64d3f702b50e7f4a2c3048f94739bd8b6d8d47b2f74c1e63&w=740" 
                        alt="" 
                        className='w-full h-[30rem] rounded-md mb-4' 
                    />
                    <div className='absolute bottom-[-15%] left-5 w-[90%] h-[180px] bg-white p-6 rounded-md shadow-lg'>
                        <p className='text-blue-500 font-bold text-2xl font-karla'>Think41</p>
                        <h1 className='text-gray-700 pt-2 text-2xl font-bold'>Optimize Your Inventory with AI.</h1>
                        {/* <p className='pt-2 text-gray-700 dark:text-gray-700'>
                            Automate your inventory with AI.
                        </p> */}
                    </div>
                </div>
                
            </div>
        </section>
    );
};

export default AboutLanding;
