import cron from "node-cron";
import getPrismaInstance from "../utils/PrismaClient.js";
import { io } from "../index.js";

const prisma = getPrismaInstance();

// Function to send notifications
export const sendNotification = async (userId, message) => {
  // console.log("Notification created: ", notification);
  // console.log("Global onlineUsers:", global.onlineUsers);
  // console.log("User ID:", userId);
  const userSocketId = global.onlineUsers.get(userId);
  console.log("User Socket ID to send notification: ", userSocketId);
  if (userSocketId) {
    const notification = await prisma.notification.create({
      data: { userId, message, isRead: true },
    });
    console.log("emitting newNotification event to user: ", userId);
    io.to(userSocketId).emit("newNotification", notification);
  } else {
    console.log("User is offline. Saving notification to DB.");
    await prisma.notification.create({
      data: { userId, message, isRead: false },
    });
  }
};

// Cron job runs every hour (At minute 0) ->0 * * * *
// cron.schedule("*/5 * * * * *", async () => {
//   console.log("🔔 Running cron job: Checking expired subscriptions...");

//   const now = new Date();
//   const twoDaysLater = new Date();
//   twoDaysLater.setDate(now.getDate() + 2);

//   // Find subscriptions expiring in 2 days
//   const expiringSubscriptions = await prisma.subscription.findMany({
//     where: {
//       endDate: {
//         gte: now, // Still active
//         lt: twoDaysLater, // Will expire in 2 days
//       },
//       status: "ACTIVE",
//     },
//   });

//   console.log("⏳ Subscriptions expiring in 2 days:", expiringSubscriptions);

//   for (const sub of expiringSubscriptions) {
//     await sendNotification(
//       sub.userId,
//       "⏳ Your subscription will expire in 2 days. Renew now to avoid service disruption."
//     );
//   }

//   // Find expired subscriptions
//   const expiredSubscriptions = await prisma.subscription.findMany({
//     where: {
//       endDate: { lt: new Date() }, // Expired subscriptions
//       status: "ACTIVE",
//     },
//   });
//   console.log("Expired Subscriptions: ", expiredSubscriptions);
//   for (const sub of expiredSubscriptions) {
//     console.log(`❌ Subscription ${sub.id} has expired.`);
//     await sendNotification(
//       sub.userId,
//       "⚠️ Your subscription has expired. Please renew your plan."
//     );

//     // Update subscription status
//     await prisma.subscription.update({
//       where: { id: sub.id },
//       data: { status: "EXPIRED" },
//     });
//   }

//   console.log(
//     `✅ Processed ${expiredSubscriptions.length} expired subscriptions.`
//   );
// });
