
import User from '../models/userModel.js';
import twilio from 'twilio';

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const otpStorage = new Map();

const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

export const sendOTP = async (req, res) => {
    try {
        const { phone, countryCode = '+91' } = req.body;
        const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;

        if (!/^\d{10}$/.test(phone)) {
            return res.status(400).json({ success: false, message: 'Invalid phone number' });
        }

        const otp = generateOTP();
        otpStorage.set(fullPhone, { 
            otp, 
            expires: Date.now() + 300000 
        });

        if (process.env.NODE_ENV === 'development') {
            console.log(`OTP for ${fullPhone}: ${otp}`);
            return res.json({ success: true, otp });
        }

        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: fullPhone
        });

        res.json({ success: true });
    } catch (error) {
        console.error('OTP error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { phone, countryCode = '+91', otp, name } = req.body;
        const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
        const storedData = otpStorage.get(fullPhone);

        if (!storedData || storedData.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        if (Date.now() > storedData.expires) {
            otpStorage.delete(fullPhone);
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        let user = await User.findOne({ phone: fullPhone });

        if (!user && name) {
            user = new User({ phone: fullPhone, name });
            await user.save();
        }

        otpStorage.delete(fullPhone);
        res.json({ success: true, user });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};
