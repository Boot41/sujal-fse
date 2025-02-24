import React from 'react'
import Accordian from '../Components/Accordian'

const data = [
    {
        id: 1,
        question: "What is Think41 Inventory Management System?",
        answer: "Think41 is an AI-powered inventory management solution designed to help retailers track, manage, and optimize their stock efficiently."
    },
    {
        id: 2,
        question: "How does AI improve inventory management?",
        answer: "Our AI analyzes sales trends, detects stock anomalies, predicts demand, and provides restocking recommendations to prevent overstocking or stockouts."
    },
    {
        id: 3,
        question: "Does Think41 send low-stock alerts?",
        answer: "Yes, the system automatically notifies you via email when stock levels drop below the set threshold, ensuring you're always stocked up."
    },
    {
        id: 4,
        question: "Can I access reports and analytics?",
        answer: "Absolutely! Think41 provides real-time sales reports, inventory analytics, and AI-generated insights in both PDF and Excel formats."
    },
    {
        id: 6,
        question: "Does Think41 offer an AI chatbot?",
        answer: "Yes! Our AI chatbot assists with inventory queries, stock updates, and even helps you add products directly through chat."
    },
    {
        id: 7,
        question: "Is my inventory data secure?",
        answer: "Security is our top priority. We use encrypted databases and industry-standard security measures to protect your inventory data."
    }
];


const FAQ = () => {
    return (
        <>
            <div id='faq'></div>
            <div className='w-full bg-[#EEF5FF] pt-14 pb-5 text-center'>
                <h2 className='text-4xl md:text-5xl text-black  font-monts font-extrabold'>FAQ<span className='text-blue-500'>'s</span></h2>
                
                    <div className='max-w-[980px] mx-auto px-3 my-10'>
                        {
                            data.map((item) => {
                                // destruct
                                const { question, answer } = item;
                                return (<div className='bg-[#F5F5F5] p-5 my-2 rounded-md' key={item.id}>
                                    <Accordian
                                        question={question}
                                        answer={answer}></Accordian>
                                </div>
                                );
                            })
                        }
                    </div>
            </div>

        </>
    )
}

export default FAQ