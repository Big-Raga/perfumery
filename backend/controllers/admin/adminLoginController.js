const admin = require("../../models/admin");
const jwt = require("jsonwebtoken");

const LoginAdmin = async (req, res) => {
    const { email } = req.body;
    try {
        const existingAdmin = await admin.findOne({ email });
        if (!existingAdmin) {
            return res.status(404).json({ data: null, message: "Admin not found" });
        }

        const otp = generateOTP();
        console.log(`\n✅ OTP for ${email}: ${otp}\n`);

        existingAdmin.currentOTP = otp;
        existingAdmin.otpExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now

        await existingAdmin.save();

        res.status(200).json({ data: null, message: "OTP sent successfully" });

    } catch (error) {
        console.error('Error in LoginAdmin:', error);
        res.status(500).json({ data: null, message: error.message || "Server error" });
    }
};

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const generateToken = async (admin) => {
    const payload = {
        id: admin._id,
        email: admin.email,
        role: 'admin'
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}




const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!otp) {
        return res.status(400).json({ data: null, message: "OTP is required" });
    }

    try {
        const existingAdmin = await admin.findOne({ email: email });
        if (!existingAdmin || existingAdmin.currentOTP !== otp || existingAdmin.otpExpiresAt < Date.now()) {
            return res.status(400).json({ data: null, message: "Invalid or expired OTP" });
        }

        existingAdmin.currentOTP = null;
        existingAdmin.otpExpiresAt = null;
        await existingAdmin.save();

        const token = await generateToken(existingAdmin);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({
            data: { token },
            message: "Login successful"
        });

    } catch (error) {
        return res.status(500).json({ data: null, message: "Server error" });
    }
}

// Logout admin and clear cookie
const LogoutAdmin = async (req, res) => {
    try {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
        });

        return res.status(200).json({
            data: null,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({ data: null, message: "Server error" });
    }
}

module.exports = {
    LoginAdmin,
    verifyOTP,
    LogoutAdmin
};
