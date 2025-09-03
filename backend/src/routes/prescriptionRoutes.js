import express from "express";
import { addPrescription, getPrescriptions, deletePrescription } from "../controllers/prescriptionController.js";
import { authMiddleware } from "../middleware/authAndAdminMiddleware.js"; // ✅ ensures user is logged in

const router = express.Router();

router.post("/", authMiddleware, addPrescription);        // Add prescription
router.get("/", authMiddleware, getPrescriptions);        // Get prescriptions
router.delete("/:id", authMiddleware, deletePrescription); // Delete prescription

export default router;
