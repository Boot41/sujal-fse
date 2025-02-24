import React from 'react';

const OurWork = () => {
    const workWeProvide = [
        {
            id: 1,
            workTitle: "AI Demand Forecasting",
            workImage: "https://img.freepik.com/free-vector/data-analysis-concept_114360-448.jpg"
        },
        {
            id: 2,
            workTitle: "Automated Stock Alerts",
            
            workImage: "https://img.freepik.com/free-vector/bell-notification-concept-illustration_114360-559.jpg"
        },
        {
            id: 3,
            workTitle: "AI Chatbot Assistance",
            
            workImage: "https://img.freepik.com/free-vector/chatbot-concept-illustration_114360-5523.jpg"
        },
        {
            id: 4,
            workTitle: "Excel & Tally Integration",
            
            workImage: "https://img.freepik.com/free-vector/budget-planning-concept-illustration_114360-4785.jpg"
        },
        {
            id: 5,
            workTitle: "Advanced Sales & Inventory Reports",
            
            workImage: "https://img.freepik.com/free-vector/financial-report-concept-illustration_114360-6714.jpg"
        },
        {
            id: 6,
            workTitle: "Smart Product Recommendations",
            
            workImage: "https://img.freepik.com/free-vector/marketing-analysis-concept_23-2148755248.jpg"
        },
    ];

    return (
        <section className='bg-[#EEF5FF] w-full py-16'>
            <div className='max-w-[1100px] mx-auto py-4 px-2'>
                <h1 className='text-3xl md:text-5xl font-karla text-center mb-2 font-bold'>
                    AI-Powered <span className='text-[#3182CE]'>Inventory Solutions</span>
                </h1>
                <p className='text-center mb-8 text-[15px] md:text-[18px]'>
                    Optimize Your Business with AI-Driven Inventory Management.
                </p>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {workWeProvide.map((item) => (
                        <div key={item.id} className='bg-white rounded-lg p-6 shadow-md flex flex-col justify-between items-center text-center h-[300px] hover:scale-105 transition-all duration-300'>
                            <img src={item.workImage} alt={item.workTitle} className='w-full h-40 object-cover rounded-md' />
                            <h2 className='text-xl font-semibold mt-4 font-karla text-blue-500'>{item.workTitle}</h2>
                            <p className='text-gray-800 font-monts'>{item.aboutOurWork}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurWork;
