const express = require("express");
const upload = require("multer")();
const {
  userpost,
  getUsers,
  getSingleUser,
  deleteUser,
  updatedUser,
  loginUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/register", upload.any(), userpost);
router.post("/login", loginUser);
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getSingleUser);
router.delete("/user/:id", auth, deleteUser);
router.put("/user/:id", auth, updatedUser);

module.exports = router;
