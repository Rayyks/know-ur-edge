const cron = require("node-cron");
const UserDeletion = require("../../models/UserDeletion");
const User = require("../../models/User");

const finalizeAccountDeletions = async () => {
  try {
    const now = new Date();
    const expiredRequests = await UserDeletion.find({
      // requestedAt: { $lte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }, // 24 hours ago
      requestedAt: { $lte: new Date(now.getTime() - 1 * 60 * 1000) },
    });

    for (const request of expiredRequests) {
      // Delete user account
      await User.findByIdAndDelete(request.userId);
      // Remove deletion request
      await UserDeletion.deleteOne({ userId: request.userId });
    }

    console.log("Account deletion cron job ran successfully.");
  } catch (error) {
    console.error("Error in account deletion cron job:", error);
  }
};

// Schedule the cron job to run every hour
cron.schedule("0 * * * *", finalizeAccountDeletions);
