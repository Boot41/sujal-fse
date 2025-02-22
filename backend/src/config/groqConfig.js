import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"; // ✅ Correct API URL

const generateGroqResponse = async (prompt) => {
    try {
        const response = await axios.post(
            GROQ_API_URL,
            {
                model: "mixtral-8x7b-32768", // ✅ Correct Groq model
                messages: [{ role: "system", content: prompt }],
                max_tokens: 300
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const aiText = response.data.choices[0].message.content;

        // 🔹 Log AI Output for Debugging
        console.log("🔹 Raw AI Response:", aiText);

        // 🔹 Ensure AI Output is Clean JSON
        if (!aiText.trim().startsWith("{")) {
            throw new Error("AI response is not in JSON format.");
        }

        return aiText;
    } catch (error) {
        console.error("❌ Error calling Groq API:", error.response?.data || error.message);
        throw new Error("AI processing failed.");
    }
};

export default generateGroqResponse;