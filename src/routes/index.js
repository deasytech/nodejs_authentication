const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const otpRoutes = require("../domains/otp");

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);

module.exports = router;