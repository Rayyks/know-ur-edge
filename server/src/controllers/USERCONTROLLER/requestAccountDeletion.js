const UserDeletion = require("../../models/UserDeletion");

exports.requestAccountDeletion = async (req, res) => {
  try {
    const { reason, customReason } = req.body;
    const userId = req.user.id; // Assuming authenticated user

    const existingRequest = await UserDeletion.findOne({ userId });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "An account deletion request already exists." });
    }

    await UserDeletion.create({ userId, reason, customReason });

    res.status(201).json({
      message:
        "Account deletion requested successfully. It will be processed after 24 hours.",
    });
  } catch (error) {
    console.error("Error requesting account deletion:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
