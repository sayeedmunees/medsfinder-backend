const jwt = require("jsonwebtoken");

const checkRole = (allowedRoles) => (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token missing");
  }

  try {
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = jwtResponse.userMail;
    req.role = jwtResponse.role;

    if (allowedRoles.includes(jwtResponse.role)) {
      next();
    } else {
      res.status(403).json("Insufficient permissions");
    }
  } catch (err) {
    res.status(401).json("Invalid Token");
  }
};

// Roles: assistant (add only), editor (add and edit), admin (full control)
const isAssistant = checkRole(["assistant", "editor", "admin"]);
const isEditor = checkRole(["editor", "admin"]);
const isAdmin = checkRole(["admin"]);

module.exports = { isAssistant, isEditor, isAdmin };
