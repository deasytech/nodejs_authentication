const User = require("../user/model");
const { sendOTP } = require("../otp/controller");

const sendVerificationOTPEmail = async (email) => {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw Error("There's no account with the provided email");
    }

    const OTPDetails = {
      email,
      subject: "Email Verification",
      message: "Verify your email with the code below.",
      duration: 1,
    };
    const createdOTP = await sendOTP(OTPDetails);
    return createdOTP;
  } catch (error) {
    throw error;
  }
};

module.exports = { sendVerificationOTPEmail };
