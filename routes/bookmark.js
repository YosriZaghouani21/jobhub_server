const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const bookmarkController = require("../controllers/bookmarkController");

// CREATE BOOKMARKS
router.post("/:id", bookmarkController.createBookmark);

// DELETE BOOKMARKS

router.delete("/:id", bookmarkController.deleteBookmark);

// GET BOOKMARKS
router.get("/:id", bookmarkController.getBookmarks);

module.exports = router;
