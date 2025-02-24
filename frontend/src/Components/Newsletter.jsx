import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setMessage("Please enter a valid email.");
            return;
        }
        setMessage("Thank you for subscribing!");
        setEmail(""); 
    };

    return (
        <section className="bg-[#EEF5FF] w-full py-16">
            <div className="max-w-[800px] mx-auto text-center px-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
                    Stay <span className="text-blue-500">Updated</span>
                </h1>
                <p className="text-gray-600 mt-4 text-lg">
                    Subscribe to receive the latest AI inventory insights & updates.
                </p>

                {/* Form Section */}
                <motion.form 
                    onSubmit={handleSubscribe} 
                    whileHover={{ scale: 1.02 }} 
                    className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4"
                >
                    <input
                        type="email"
                        className="p-3 w-full md:w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 shadow-lg"
                    >
                        Subscribe
                    </motion.button>
                </motion.form>

                {/* Message */}
                {message && (
                    <p className="mt-4 text-green-600 font-semibold">{message}</p>
                )}
            </div>
        </section>
    );
};

export default Newsletter;
