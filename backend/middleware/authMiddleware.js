const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies?.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ data: null, message: "Unauthorized - No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ data: null, message: "Unauthorized - Invalid token" });
    }
};

module.exports = AuthMiddleware;

