import User from "../models/User.js"

// GET all pending pharmacies
export const getPendingPharmacies = async (req, res) => {
  try {
    const pharmacies = await User.find({ role: "pharmacy", isVerified: false });
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pharmacies" });
  }
};

// VERIFY pharmacy
export const verifyPharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await User.findById(id);

    if (!pharmacy || pharmacy.role !== "pharmacy") {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    pharmacy.isVerified = true;
    await pharmacy.save();

    res.json({ message: "Pharmacy verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error verifying pharmacy" });
  }
};

// REJECT pharmacy (optional)
export const rejectPharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    const pharmacy = await User.findById(id);

    if (!pharmacy || pharmacy.role !== "pharmacy") {
      return res.status(404).json({ message: "Pharmacy not found" });
    }

    await pharmacy.deleteOne();
    res.json({ message: "Pharmacy rejected and deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error rejecting pharmacy" });
  }
};
