import bcrypt from "bcryptjs";
import User from "../../models/User.js";   // ✅ correct import


export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body; // <-- take from body

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: "Invalid or expired token" });

        // Hash and update password
        const hashed = await bcrypt.hash(newPassword, 10);
        user.password = hashed;

        // Clear reset fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error("Reset password error:", err);
        res.status(500).json({ message: "Error resetting password", error: err.message });

    }
};
