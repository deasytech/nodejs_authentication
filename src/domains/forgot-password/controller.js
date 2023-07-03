const User = require("../user/model");
const { sendOTP } = require("../otp/controller");

const sendPasswordResetEmailOTP = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There's no account for the provided email.");
    }
    if (!existingUser.verified) {
      throw Error("Email hasn't been verified yet. Check your inbox or junk");
    }

    const OTPDetails = {
      email,
      subject: "Password Reset",
      message: "Enter the code below to reset your password.",
      duration: 1,
    };
    const createdOTP = await sendOTP(OTPDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendPasswordResetEmailOTP };
