const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwtMiddleware");
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  try {
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwtResponse);
    req.payload = jwtResponse.userMail;
    next();
  } catch (err) {
    res.status(401).json("Authorization Failed... Please Login");
  }
};

module.exports = jwtMiddleware;
