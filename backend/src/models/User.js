import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["user", "pharmacy", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },

  // 🔥 Only store references now
  prescriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prescription" }],
  reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],

  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema, "users");

export default User;
