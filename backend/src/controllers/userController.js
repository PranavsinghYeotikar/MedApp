import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().populate("prescriptions.pharmacyId");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUsersByID = async (req, res) => {
    try {
        const usersByID = await User.findById(req.params.id).populate("prescriptions.pharmacyId");
        res.status(200).json(usersByID);
    } catch (error) {
        console.error("Error in getUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const postUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const { prescription, reminder, phone, address } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (prescription && Array.isArray(prescription)) {
            user.prescription.push(...prescription);
        }

        if (reminder && Array.isArray(reminder)) {
            user.reminder.push(...reminder);
        }

        if (phone) {
            user.phone = phone;
        }

        if (address) {
            user.address = address;
        }

        await user.save();

        res.status(201).json("User posted");
    } catch (error) {
        console.error("Error in postUsers:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const putUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { prescriptions = [], reminders = [], phone, address } = req.body || {};

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // overwrite or update fields
        if (prescriptions && Array.isArray(prescriptions)) {
            user.prescriptions = prescriptions;
        }

        if (reminders && Array.isArray(reminders)) {
            user.reminders = reminders;
        }

        if (phone) {
            user.phone = phone;
        }

        if (address) {
            user.address = address;
        }

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error in putUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);

        if(!deletedUser) return res.status(484).json({message:'User not found'});

        res.status(200).json("User deleted");
    } catch (error) {
        console.error("Error in putUser:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}