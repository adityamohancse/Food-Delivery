import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/authController.js'; // Fixed path

const router = express.Router();

// Phone OTP routes
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);

export default router;
