const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // If no token is provided, respond with 401
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        // Decode the token using your JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded user data to the request object
        req.user = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        // Token is invalid or expired
        res.status(401).json({ message: "Token is not valid" });
    }
};
