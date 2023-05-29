const express = require('express')
const {
    createChat,myChats,addUser,removeUser
  } = require('../controller/chatController');
const {isAuthenticated} = require('../middleware/authentication')

// Routes related to chat/
const chatRouter = express.Router();

chatRouter.route("/create").post(isAuthenticated,createChat);
chatRouter.route("/my_Chats").post(isAuthenticated,myChats);
chatRouter.route("/add_user").post(isAuthenticated,addUser);
chatRouter.route("/remove_user").post(isAuthenticated,removeUser);

module.exports = {chatRouter};