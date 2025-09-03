import crypto from "crypto";
import User from "../../models/User.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // TODO: send email instead of console.log
    console.log(`Password reset link: http://localhost:5000/auth/reset-password/${token}`);

    res.json({ message: "Password reset link sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Error in forgot password" });
  }
};
