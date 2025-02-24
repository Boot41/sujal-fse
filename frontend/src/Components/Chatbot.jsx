import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I assist you today?" }]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    // Auto-scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Toggle chatbot visibility
    const toggleChat = () => setIsOpen(!isOpen);

    // Handle input change
    const handleInputChange = (e) => setInput(e.target.value);

    // Send message to AI chatbot API
    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { sender: "user", text: input }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await axios.post("http://localhost:5000/api/v1/chatbot", 
                { query: input }, 
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setMessages([...newMessages, { sender: "bot", text: response.data.response?.answer || "No response from AI" }]);
        } catch (error) {
            console.error("❌ Error fetching chatbot response:", error);
            setMessages([...newMessages, { sender: "bot", text: "Oops! Something went wrong." }]);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 flex flex-col items-end z-50">
            {/* Chat Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChat}
                className="bg-blue-500 text-white p-4 rounded-full shadow-xl hover:bg-blue-600 transition"
            >
                {isOpen ? <FaTimes size={24} /> : <FaRobot size={24} />}
            </motion.button>

            {/* Chat Window */}
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-96 bg-white shadow-xl rounded-xl overflow-hidden mt-3 border border-gray-200"
                >
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-4 text-lg font-semibold flex justify-between items-center">
                        AI Chatbot
                        <button onClick={toggleChat}>
                            <FaTimes />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="h-72 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-gray-400">
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[80%] p-3 rounded-xl text-sm ${msg.sender === "user" ? "bg-orange-500 text-white ml-auto" : "bg-gray-200 text-black"}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Field */}
                    <div className="p-4 flex items-center border-t bg-gray-100">
                        <input
                            type="text"
                            className="flex-1 p-3 border rounded-xl focus:outline-none"
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={handleInputChange}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 text-white p-3 rounded-xl ml-2 hover:bg-blue-600 transition"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Chatbot;