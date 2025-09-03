import User from "../models/User.js";
import Prescription from "../models/Prescription.js";

// ADD prescription
export const addPrescription = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { medicineName, dosage, frequency, startDate, endDate } = req.body;

    if (!medicineName || !startDate || !endDate) {
      return res.status(400).json({ message: "medicineName, startDate and endDate are required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create prescription
    const prescription = new Prescription({
      userId,
      medicineName,
      dosage,
      frequency,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });
    await prescription.save();

    // Push reference to user only if not already added
    if (!user.prescriptions.includes(prescription._id)) {
      user.prescriptions.push(prescription._id);
      await user.save();
    }

    res.status(201).json({ message: "Prescription added", prescription });
  } catch (err) {
    console.error("Error adding prescription:", err);
    res.status(500).json({ message: "Error adding prescription", error: err.message });
  }
};

// GET prescriptions
export const getPrescriptions = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const prescriptions = await Prescription.find({ userId }).sort({ startDate: -1 });

    res.json(prescriptions);
  } catch (err) {
    console.error("Error fetching prescriptions:", err);
    res.status(500).json({ message: "Error fetching prescriptions", error: err.message });
  }
};

// DELETE prescription
export const deletePrescription = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    // Remove prescription and ensure it belongs to the user
    const deleted = await Prescription.findOneAndDelete({ _id: id, userId });
    if (!deleted) return res.status(404).json({ message: "Prescription not found" });

    // Pull from user's prescriptions array
    await User.findByIdAndUpdate(userId, { $pull: { prescriptions: id } });

    res.json({ message: "Prescription deleted", deleted });
  } catch (err) {
    console.error("Error deleting prescription:", err);
    res.status(500).json({ message: "Error deleting prescription", error: err.message });
  }
};
