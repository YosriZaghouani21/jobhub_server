const router = require("express").Router();
const messageController = require("../controllers/messagesController");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken");

// CREATE MESSAGE
router.post("/:id", messageController.sendMessage);

// ALL MESSAGES
router.get("/:id", messageController.allMessages);

module.exports = router;
