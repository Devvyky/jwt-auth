const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/v1/users/signup
router.get("/", auth, authController.getAllUser);

router.get("/user", auth, authController.getSingleUser);

router.put("/update", auth, authController.updateInfo);

router.post("/signup", authController.signup);

module.exports = router;
