const User = require("./model");
const { hashData, verifyHashedData } = require("../../utils/hashData");
const createToken = require("../../utils/createToken");

const authenticateUser = async (data) => {
  try {
    const { email, password } = data;

    const fetchUser = await User.findOne({ email });
    if (!fetchUser) {
      throw Error("Invalid credentials entered!");
    }
    if (!fetchUser.verified) {
      throw Error("Email hasn't been verified yet. Check your inbox or junk.");
    }

    const hashedPassword = fetchUser.password;
    const passwordMatch = await verifyHashedData(password, hashedPassword);
    if (!passwordMatch) {
      throw Error("Invalid password entered!");
    }

    // create user token
    const tokenData = { userId: fetchUser._id, email };
    const token = await createToken(tokenData);

    fetchUser.token = token;
    return fetchUser;
  } catch (error) {
    throw error;
  }
}

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

module.exports = { createNewUser, authenticateUser };