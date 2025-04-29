import User from "../models/User.js"; // adjust path
import mongoose from "mongoose";

export const distributeDailyRewards = async () => {
  try {
    console.log("starting distribution")
    const today = new Date();
    today.setHours(0, 0, 0, 0); // reset time to midnight

    const users = await User.find();

    for (const user of users) {
      // Check if today's rewards already distributed
      // if (user.lastRewardDate && new Date(user.lastRewardDate).getTime() === today.getTime()) {
      //   console.log(`User ${user.email} already rewarded today.`);
      //   continue;
      // }

      // Process each plan
      for (const coinType of ["BTC", "ETH", "USD"]) {
        const userPlans = user.plans[coinType] || [];
        console.log(`${user.email} - ${coinType} plans count: ${userPlans.length}`); //DEBUGGING

        for (const plan of userPlans) {
          const purchaseDate = new Date(plan.purchaseDate);
          const endDate = new Date(purchaseDate);
          endDate.setDate(endDate.getDate() + plan.totalPeriod);
          console.log(`Checking plan for ${coinType}:`, plan); //DEBUGING

          if (today >= purchaseDate && today <= endDate) {    //this makes sure that a plan purchased today would not generate any profit that same day
            // Add today's reward to balance
            if (coinType === "BTC") {
              console.log("BTC BALANCE:",user.balance.btc)
              if (typeof user.balance.btc !== "number") user.balance.btc = 0;
              user.balance.btc += plan.rewardPerDay;
              user.earnings.BTC = (user.earnings.BTC || 0) + plan.rewardPerDay;
            } else if (coinType === "ETH") {
              user.balance.eth += plan.rewardPerDay;
              user.earnings.ETH = (user.earnings.ETH || 0) + plan.rewardPerDay;
            } else if (coinType === "USD") {
              user.balance.usd += plan.rewardPerDay;
              user.earnings.USD = (user.earnings.USD || 0) + plan.rewardPerDay;
            }else if (coinType === "BTC") {
              console.log("BTC BALANCE:",user.balance.btc)
              user.balance.btc += plan.rewardPerDay;
              user.earnings.BTC = (user.earnings.BTC || 0) + plan.rewardPerDay;
            }
          }
        }
      }

      // Update lastRewardDate to today after giving rewards
      user.lastRewardDate = today;
      await user.save();
      console.log(`Daily reward distributed to ${user.email}`);
    }

    console.log("✅ Daily rewards distribution completed.");
  } catch (error) {
    console.error("❌ Error distributing daily rewards:", error);
  }
};
