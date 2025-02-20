import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const {Pool} = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

// Test the connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL Connected Successfully"))
  .catch((err) => console.error("❌ PostgreSQL Connection Error:", err));

export default pool;
