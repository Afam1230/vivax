// cronJobs/rewardCron.js
import cron from "node-cron";
import { distributeDailyRewards } from "./distributeDailyRewards.js"; // adjust the path

async function runWithRetry(fn, maxAttempts = 3, delayMs = 5000) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log(`Attempt ${attempt} to distribute rewards...`);
      await fn(); // Try running the function
      console.log("Rewards distributed successfully! ✅");
      return; // Exit if successful
    } catch (error) {
      console.error(`Error on attempt ${attempt}:`, error.message);

      if (attempt < maxAttempts) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs)); // Wait before retry
      } else {
        console.error("All retry attempts failed ❌");
      }
    }
  }
}


// Run at midnight every day (00:00)
cron.schedule('0 0 * * *', async () => {
  console.log("Running daily reward distribution...");
  await runWithRetry(distributeDailyRewards, 3, 5000); // 3 attempts, 5s delay between retries
  console.log("Finished daily reward distribution!");
});
