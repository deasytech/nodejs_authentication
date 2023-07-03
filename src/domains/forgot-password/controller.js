const User = require("../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("../otp/controller");
const { hashData } = require("../../utils/hashData");

const resetUserPassword = async ({ email, otp, newPassword }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. Check your inbox or junk.");
    }

    if (newPassword.length < 6) {
      throw Error("Password too short.");
    }

    const hashedNewPassword = await hashData(newPassword);
    await User.updateOne({ email }, { password: hashedNewPassword });
    await deleteOTP(email);

    return;
  } catch (error) {
    throw error;
  }
};

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

module.exports = { sendPasswordResetEmailOTP, resetUserPassword };
