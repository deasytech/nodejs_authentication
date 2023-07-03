const express = require("express");
const router = express.Router();

const userRoutes = require("../domains/user");
const otpRoutes = require("../domains/otp");
const emailVerificationRoutes = require("../domains/email-verification");
const forgotPasswordRoutes = require("../domains/forgot-password");

router.use("/user", userRoutes);
router.use("/otp", otpRoutes);
router.use("/email-verification", emailVerificationRoutes);
router.use("/forgot-password", forgotPasswordRoutes);

module.exports = router;