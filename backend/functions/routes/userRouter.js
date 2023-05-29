const express = require('express')
const {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    registerGoogleUser
  } = require('../controller/userController');
const {signOut, isAuthenticated} = require('../middleware/authentication')

// Routes related to user/
const userRouter = express.Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/register_google").post(registerGoogleUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(signOut, logoutUser);
userRouter.route("/get_user").post(isAuthenticated, getUser);

module.exports = {userRouter};