// seed.js — For putting data into MongoDB Compass from MedApp/data
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/medapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Generic schemas
const Admin = mongoose.model("Admin", new mongoose.Schema({}, { strict: false }));
const Pharmacy = mongoose.model("Pharmacy", new mongoose.Schema({}, { strict: false }));
const User = mongoose.model("User", new mongoose.Schema({}, { strict: false })); // updated name
const Medicine = mongoose.model("Medicine", new mongoose.Schema({}, { strict: false }));
const Prescription = mongoose.model("Prescription", new mongoose.Schema({}, { strict: false }));
const Notification = mongoose.model("Notification", new mongoose.Schema({}, { strict: false }));

// Files & models mapping
const datasets = [
  { model: Admin, file: path.join(__dirname, "../../data/Admin.json") },
  { model: Pharmacy, file: path.join(__dirname, "../../data/Pharmacies.json") },
  { model: User, file: path.join(__dirname, "../../data/User.json") },
  { model: Medicine, file: path.join(__dirname, "../../data/Medicines.json") },
  { model: Prescription, file: path.join(__dirname, "../../data/Prescription.json") },
  { model: Notification, file: path.join(__dirname, "../../data/Notification.json") }
];

// Seed function
const seedData = async () => {
  try {
    for (const data of datasets) {
      const jsonData = JSON.parse(fs.readFileSync(data.file, "utf-8"));

      // Hash passwords if present
      if (["admin", "user", "pharmacy"].some(f => data.file.toLowerCase().includes(f))) {
        for (const item of jsonData) {
          if (item.password) {
            const salt = await bcrypt.genSalt(10);
            item.password = await bcrypt.hash(item.password, salt);
          }
        }
      }

      if (data.model.modelName === "User") {
        // Merge existing users instead of overwriting
        for (const user of jsonData) {
          const existingUser = await data.model.findById(user._id);

          if (existingUser) {
            const mergedPrescriptions = [
              ...existingUser.prescriptions,
              ...user.prescriptions
            ];

            const mergedReminders = [
              ...existingUser.reminders,
              ...user.reminders
            ];

            await data.model.updateOne(
              { _id: user._id },
              { 
                $set: {
                  name: user.name,
                  email: user.email,
                  phone: user.phone,
                  address: user.address,
                  prescriptions: mergedPrescriptions,
                  reminders: mergedReminders
                }
              }
            );
            console.log(`♻️ Updated user ${user.name}`);
          } else {
            await data.model.create(user);
            console.log(`➕ Created new user ${user.name}`);
          }
        }
      } else {
        // For other models, clear old data & insert new
        await data.model.deleteMany({});
        await data.model.insertMany(jsonData);
        console.log(`✅ ${data.file} imported successfully`);
      }
    }

    console.log("🎉 All datasets imported successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
};

seedData();
