const jwt = require("jsonwebtoken");

const jwtAdminMiddleware = (req, res, next) => {
  console.log(req.headers["authorization"].split(" ")[1]);
  const token = req.headers["authorization"].split(" ")[1];

  console.log(token);

  try {
    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwtResponse);
    req.payload = jwtResponse.userMail;

    if (jwtResponse.userMail == "admin@medsfinder.com") {
      next();
    } else {
      res.status(401).json("Invalid user....");
    }
  } catch (err) {
    res.status(401).json("Invalid Token");
  }
};

module.exports = jwtAdminMiddleware;
