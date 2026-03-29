// import dotenv config
require("dotenv").config();

// import express library
const express = require("express");
// import cors
const cors = require("cors");
// import route
const route = require("./routes.js");
// import db connection files
require("./databaseConnection.js");
// import rate limit
const { globalLimiter } = require("./middleware/rateLimitMiddleware.js");

// create server
const medsfinderServer = express();

// server using cors
medsfinderServer.use(
  cors({
    origin: "http://localhost:5173", // Restrict to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
medsfinderServer.use(express.json()); //parse middleware
medsfinderServer.use(globalLimiter); // Apply global rate limit to all requests
medsfinderServer.use(route);

// export the uploads folder from the server side
medsfinderServer.use('/upload', express.static("./uploads"))


// create port
PORT = 4000 || process.env.PORT;

medsfinderServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

medsfinderServer.get("/", (req, res) => {
  res.status(200).send(`<h1>Server Started!!</h1>`);
});
