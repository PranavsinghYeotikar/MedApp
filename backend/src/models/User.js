import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy" }
  },
  { _id: false }
);

const reminderSchema = new mongoose.Schema(
  {
    medicineName: { type: String, required: true },
    reminderTime: { type: Date, required: true },
    notified: { type: Boolean, default: false }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  role: { type: String, enum: ["user", "pharmacy", "admin"], default: "user" },
  isVerified: { type: Boolean, default: false },
  prescriptions: [prescriptionSchema],
  reminders: [reminderSchema],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema, "users");

export default User;
