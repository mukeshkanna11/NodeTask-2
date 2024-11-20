const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    try {
        // Check if the Authorization header exists
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Token verification error:", err.message);

        // Handle invalid or expired tokens
        res.status(401).json({ message: "Token is not valid" });
    }
};
