const UserDeletion = require("../../models/UserDeletion");

exports.cancelAccountDeletion = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletionRequest = await UserDeletion.findOne({ userId });
    if (!deletionRequest) {
      return res.status(404).json({
        success: false,
        message: "No account deletion request found.",
      });
    }

    await UserDeletion.deleteOne({ userId });

    res.status(200).json({
      success: true,
      message: "Account deletion request cancelled successfully.",
    });
  } catch (error) {
    console.error("Error cancelling account deletion:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
