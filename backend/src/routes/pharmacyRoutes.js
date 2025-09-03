import express from "express";
import { 
  getPendingPharmacies, 
  verifyPharmacy, 
  rejectPharmacy 
} from "../controllers/pharmacyAdminCheck.js";
import { authMiddleware, adminMiddleware } from "../middleware/authAndAdminMiddleware.js";

const router = express.Router();

// only admin should access these
router.get("/pending", authMiddleware, adminMiddleware, getPendingPharmacies);
router.put("/verify/:id", authMiddleware, adminMiddleware, verifyPharmacy);
router.delete("/reject/:id", authMiddleware, adminMiddleware, rejectPharmacy);

export default router;
