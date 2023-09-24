const router = require("express").Router();
const chatController = require("../controllers/chatControllers");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

// CREATE CHAT
router.post("/:id", chatController.accessChat);

// Get Chats
router.get("/:id", chatController.getChats);

module.exports = router;
