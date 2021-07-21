const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// POST /api/v1/users/signup
router.get("/", authController.getAllUser);

router.post("/signup", authController.signup);

module.exports = router;
