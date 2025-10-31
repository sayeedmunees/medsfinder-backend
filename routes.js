// import express
const express = require("express");
// import userController
const userController = require("./controller/userController.js");

// create instance
const route = new express.Router();

// path for signup
route.post("/signup", userController.signUpController);

// path for signin
route.post("/signin", userController.signInController);

// path for google signin
// route.post("/google-signin", userController.googleSigninController);

// routes export
module.exports = route;
