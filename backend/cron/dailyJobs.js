// cron/dailyJobs.js
import cron from 'node-cron';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

// Schedule job: Every day at 00:00 (midnight)
export const startDailyJobs = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log("⏰ Running daily mining rewards and plan expiration checks...");

    try {
      const users = await User.find();
      const now = new Date();

      for (const user of users) {
        let balanceUpdated = false;
        let transactionsToAdd = [];

        ['BTC', 'ETH', 'USD'].forEach((coinType) => {
          if (user.plans && user.plans[coinType]) {
            const activePlans = [];

            user.plans[coinType].forEach(plan => {
              if (!plan.purchaseDate || !plan.totalPeriod) {
                console.warn(`⚠️ Missing purchaseDate or totalPeriod for plan in user ${user.email}`);
                return; // Skip this plan if data missing
              }

              // Calculate the plan's end date dynamically
              const purchaseDate = new Date(plan.purchaseDate);
              const endDate = new Date(purchaseDate);
              endDate.setDate(endDate.getDate() + plan.totalPeriod);

              if (now < endDate) {
                // Plan is still active, add reward
                user.balance[coinType.toLowerCase()] += plan.rewardPerDay;
                balanceUpdated = true;

                transactionsToAdd.push({
                  _id: uuidv4(),
                  type: "daily-return",
                  coin: coinType,
                  amount: plan.rewardPerDay,
                  date: now,
                  details: `Daily mining reward from plan: ${plan.label}`,
                  status: "successful",
                });

                activePlans.push(plan); // Keep active plan
              } else {
                // Plan expired
                console.log(`⚡ Plan expired for user ${user.email}: ${plan.label}`);
              }
            });

            user.plans[coinType] = activePlans; // Update only active plans
          }
        });

        if (balanceUpdated || transactionsToAdd.length > 0) {
          user.transactions.push(...transactionsToAdd);
          await user.save();
          console.log(`✅ Updated user: ${user.email}`);
        }
      }

      console.log("🎯 Daily mining rewards and plan expiration job completed!");

    } catch (err) {
      console.error("❌ Error during daily mining cron job:", err);
    }
  });
};
