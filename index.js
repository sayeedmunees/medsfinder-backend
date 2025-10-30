// import dotenv config
require("dotenv").config();

// import express library
const express = require("express");
// import cors
const cors = require("cors");
// import route
const route = require("./routes.js");

// create server
const medsfinderServer = express();

// server using cors
medsfinderServer.use(cors());
medsfinderServer.use(express.json());
medsfinderServer.use(route);

// create port
PORT = 4000 || process.env.PORT;

medsfinderServer.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
