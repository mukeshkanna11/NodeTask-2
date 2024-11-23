const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    try {
        console.log("Incoming request headers:", req.headers);

        // Check if the Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            console.error("Authorization header missing or invalid format");
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Extract the token
        const token = authHeader.split(" ")[1];
        console.log("Extracted token:", token);

        if (!token) {
            console.error("Token not found after 'Bearer'");
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Manual verification of the token for debugging
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Token manually verified:", decoded);

            // Attach user info to the request object
            req.user = decoded;

            // Pass control to the next middleware or route
            next();
        } catch (err) {
            console.error("Manual token verification error:", err.message);

            // Handle specific token errors
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }

            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }

            // Handle unexpected errors
            return res.status(500).json({ message: "Server error during token verification", error: err.message });
        }
    } catch (err) {
        console.error("Unexpected error:", err.message);
        res.status(500).json({ message: "Unexpected server error", error: err.message });
    }
};
