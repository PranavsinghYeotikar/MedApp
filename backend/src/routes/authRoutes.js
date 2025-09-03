import express from "express";
import { signUpAdmin, signUpUser, signUpPharmacy, postSignIn } from "../controllers/AuthControllers/authController.js";
import multer from "multer";
import { forgotPassword } from "../controllers/AuthControllers/ForgotPasswordController.js";
import { resetPassword } from "../controllers/AuthControllers/resetPasswordController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup/user", signUpUser);   
router.post("/signup/pharmacy", upload.single("licenseDoc"), signUpPharmacy);
router.post("/signup/admin", signUpAdmin); 

router.post("/signin", postSignIn);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

export default router;