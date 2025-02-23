import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

const generateGroqResponse = async (prompt) => {
    try {
        const response = await axios.post(
            GROQ_API_URL,
            {
                model: "mixtral-8x7b-32768",
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

        console.log("🔹 Full API Response:", JSON.stringify(response.data, null, 2));

        // Ensure response structure matches expectation
        if (!response.data.choices || response.data.choices.length === 0) {
            throw new Error("Unexpected API response structure.");
        }

        const aiText = response.data.choices[0]?.message?.content?.trim();

        if (!aiText) {
            throw new Error("AI response is empty.");
        }

        return aiText;
    } catch (error) {
        console.error("❌ Error calling Groq API:", error.response?.data || error.message);
        throw new Error("AI processing failed.");
    }
};

export default generateGroqResponse;
