const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticateToken(req, res, next) {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).send("Invalid token.");

    req.user = user; // Attach complete user object to req
    next();
  } catch (error) {
    console.error("Error authenticating token:", error);
    res.status(403).send("Invalid token.");
  }
}

module.exports = { authenticateToken };
