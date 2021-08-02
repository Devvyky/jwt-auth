const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./jwt-auth/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});

var upload = multer({ storage: storage });

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

module.exports = router;
