const express = require('express')
const {
    createMessage , getMessages
  } = require('../controller/messageController');
const {isAuthenticated} = require('../middleware/authentication')

// Routes related to message/
const messageRouter = express.Router();

messageRouter.route("/create").post(isAuthenticated,createMessage);
messageRouter.route("/get_messages").post(isAuthenticated,getMessages);

module.exports = {messageRouter};