
import cron from "node-cron";
import { distributeDailyRewards } from "./distributeDailyRewards.js"; // adjust path

export const startDailyRewardJob = () => {
  // "0 0 * * *" => every day at midnight server time
  cron.schedule("0 0 * * *", async () => {
    console.log("⏰ Running daily reward distribution...");

    try {
      await distributeDailyRewards();
      console.log("✅ Daily rewards distributed successfully!");
    } catch (error) {
      console.error("❌ Error during daily rewards distribution:", error);
    }
  });
};
