import express from "express";
import { signUpAdmin, signUpUser, signUpPharmacy, postSignIn } from "../controllers/authController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup/user", signUpUser);   
router.post("/signup/pharmacy", upload.single("licenseDoc"), signUpPharmacy);
router.post("/signup/admin", signUpAdmin); 

router.post("/signin", postSignIn);

export default router;