const User = require("./model");
const { hashData } = require("../../utils/hashData");

const createNewUser = async (data) => {
  try {
    const { name, phone, email, password } = data;
    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }
    // hash password
    const hashedPassword = await hashData(password);
    const newUser = new User({
      name,
      phone,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    throw error;
  }
};

module.exports = { createNewUser };