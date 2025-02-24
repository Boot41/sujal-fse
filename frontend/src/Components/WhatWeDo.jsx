import React from 'react';
import { NavLink } from 'react-router-dom';

const WhatWeDo = () => {
    return (
        <section className='bg-[#EEF5FF] w-full py-16'>
            <div className='max-w-[1100px] mx-auto'>
                <h1 className='text-5xl font-karla text-center mb-8 font-bold'>
                    How <span className='text-[#3182CE]'>Think41</span> Helps You?
                </h1>
                
                <div className='flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md'>
                    
                    {/* Left - Image */}
                    <div className='md:w-1/2'>
                        <img 
                            src="https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?t=st=1740393210~exp=1740396810~hmac=dbe1ed4a15df82caaf3f9ce738caa4da3d7966454b67a8dbb0d244af330930b1&w=900" 
                            alt="AI-Powered Inventory" 
                            className='w-full h-auto rounded-md' 
                        />
                    </div>

                    {/* Right - Content */}
                    <div className='md:w-1/2 bg-white p-8 font-monts'>
                        <h1 className='text-4xl font-bold border-b-2 border-blue-500 pb-4'>
                            Optimize Your <span className='text-[#3182CE]'>Inventory</span> with AI
                        </h1>
                        
                        <p className='text-gray-700 mb-6 pt-4'>
                            Think41 helps retailers track, predict, and optimize inventory with AI.  
                            Prevent stock issues and make smarter business decisions.
                        </p>

                        <div className='space-y-2'>
                            <p>📊 AI Demand Forecasting</p>
                            <p>🔔 Automated Stock Alerts</p>
                            <p>🤖 AI Chatbot for Inventory</p>
                            <p>📑 Excel & Tally Integration</p>
                            <p>📈 Sales & Inventory Reports</p>
                        </div>

                        {/* Call-to-Action */}
                        <NavLink to='/about' className='text-blue-500 mt-4 inline-block'>
                            Learn More About Think41 →
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeDo;
