import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    medicineName: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    pharmacyId: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy" }
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema, "prescriptions");

export default Prescription;
