import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token missing" });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const adminEmail = process.env.ADMIN_EMAIL;

        if (!jwtSecret || !adminEmail) {
            console.error("Environment variables not set: JWT_SECRET or ADMIN_EMAIL");
            return res.status(500).json({ success: false, message: "Server configuration error" });
        }

        const tokenPayload = jwt.verify(token, jwtSecret);

        if (!tokenPayload?.email || tokenPayload.email !== adminEmail) {
            return res.status(403).json({ success: false, message: "Access denied: Admins only" });
        }

        next();
    } catch (error) {
        console.error("Admin Auth Error:", error.message);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

export default adminAuth;
