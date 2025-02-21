import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (retries = 5, delay = 5000) => {
    while (retries) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("✅ MongoDB Connected!");
            return;
        } catch (error) {
            console.error(`❌ MongoDB Connection Error: ${error.message}`);
            retries -= 1;
            console.log(`🔄 Retrying in ${delay / 1000} seconds... (${retries} retries left)`);
            await new Promise((res) => setTimeout(res, delay));
        }
    }
    console.error("🚨 MongoDB could not connect after multiple retries. Exiting...");
    process.exit(1);
};

export default connectDB;
