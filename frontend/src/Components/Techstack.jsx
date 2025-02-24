import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt } from 'react-icons/fa';
import { SiExpress, SiMongodb, SiAxios, SiPostman, SiOpenai } from 'react-icons/si';

const techStack = [
    { id: 1, name: "React", icon: <FaReact className="text-blue-500" />, description: "Frontend library for UI development" },
    { id: 2, name: "Node.js", icon: <FaNodeJs className="text-green-600" />, description: "JavaScript runtime for backend" },
    { id: 3, name: "Express.js", icon: <SiExpress className="text-gray-800" />, description: "Fast backend framework for Node.js" },
    { id: 4, name: "MongoDB", icon: <SiMongodb className="text-green-500" />, description: "NoSQL database for flexible data storage" },
    { id: 5, name: "Axios", icon: <SiAxios className="text-blue-600" />, description: "Promise-based HTTP client" },
    { id: 6, name: "Postman", icon: <SiPostman className="text-orange-500" />, description: "API testing and development tool" },
    { id: 7, name: "Groq AI", icon: <SiOpenai className="text-purple-600" />, description: "AI model for intelligent responses" },
    { id: 8, name: "Git", icon: <FaGitAlt className="text-red-600" />, description: "Version control system for tracking changes" },
];

const TechStack = () => {
    return (
        <section className="bg-[#EEF5FF] w-full py-16">
            <div className="max-w-[1100px] mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Technologies <span className="text-blue-500">Used</span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    Powering the AI-Powered Inventory Management System
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
                    {techStack.map((tech) => (
                        <motion.div
                            key={tech.id}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center transition-all duration-300 h-[200px]"
                        >
                            <div className="text-5xl animate-bounce">{tech.icon}</div>
                            <h2 className="mt-4 text-xl font-bold text-gray-800">{tech.name}</h2>
                            <p className="text-gray-600 text-sm mt-2">{tech.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
