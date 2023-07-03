const User = require("../user/model");
const { sendOTP, verifyOTP, deleteOTP } = require("../otp/controller");

const verifyUserEmail = async ({ email, otp }) => {
  try {
    const validOTP = await verifyOTP({ email, otp });
    if (!validOTP) {
      throw Error("Invalid code passed. check your inbox or junk.");
    }

    // update verified user record
    await User.updateOne({ email }, { verified: true });
    await deleteOTP(email);
    return;
  } catch (error) {
    throw error;
  }
};

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

module.exports = { sendVerificationOTPEmail, verifyUserEmail };
