const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// UPADATE USER
router.put("/:id", userController.updateUser);

// DELETE USER

router.delete("/", verifyTokenAndAuthorization, userController.deleteUser);

// GET USER

router.get("/:id", userController.getUser);

// GET ALL USER

router.get("/", verifyTokenAndAdmin, userController.getAllUsers);

module.exports = router;
