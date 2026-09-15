import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", authenticate, AuthController.getProfile);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/verify-otp", AuthController.verifyOtp);
router.post("/reset-password", AuthController.resetPassword);

export default router;
