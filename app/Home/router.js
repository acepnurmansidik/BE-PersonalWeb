const express = require("express");
const router = express.Router();
const { viewHome, viewContactMe } = require("./controller");

router.get("/", viewHome);
router.get("/contact-me", viewContactMe);

module.exports = router;
