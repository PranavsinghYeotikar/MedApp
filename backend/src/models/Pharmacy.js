import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  licenseNumber: String,
  GSTIN: String,
  status: String,
  inventory: Array,
  createdAt: { type: Date, default: Date.now }
});

const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);

export default Pharmacy;
