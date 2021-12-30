const express = require("express");
const router = express.Router();
const {
  viewSignIn,
  viewSignUp,
  actionSignUp,
  actionSignIn,
  actionSignOut,
} = require("./controller");

router.get("/sign-in", viewSignIn);
router.post("/sign-in", actionSignIn);

router.get("/sign-up", viewSignUp);
router.post("/sign-up", actionSignUp);

router.get("/sign-out", actionSignOut);

module.exports = router;
