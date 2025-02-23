import cron from "node-cron";
import { generateFinancialTallyFile } from "../controllers/tally.controllers.js";
import User from "../models/user.models.js";

// 🔹 Schedule Weekly Financial Report (Every Sunday Midnight)
cron.schedule("0 0 * * 0", async () => {
    console.log("📅 Generating weekly financial Tally reports...");

    const users = await User.find({});
    for (const user of users) {
        try {
            await generateFinancialTallyFile({ user: { _id: user._id } }, { json: () => { } });
            console.log(`✅ Weekly Financial Report Sent to ${user.email}`);
        } catch (error) {
            console.error(`❌ Error generating report for ${user.email}`, error);
        }
    }
});