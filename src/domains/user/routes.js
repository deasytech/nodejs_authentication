const express = require("express");
const router = express.Router();
const { createNewUser, authenticateUser } = require("./controller");
const auth = require("../../middleware/auth");

// Private Data
router.get("/private_data", auth, (req, res) => {
    res.status(200).send(`You're in the private territory of ${req.currentUser.name}`);
});

// Login
router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (!(email && password)) {
        throw Error("Empty credentials supplied!");
    }

    const authenticatedUser = await authenticateUser({email, password});
    res.status(200).json(authenticatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    name = name.trim();
    phone = phone.trim();
    email = email.trim();
    password = password.trim();

    if (!(name && phone && email && password)) {
      throw Error("Empty input fileds!");
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
      throw Error("Invalid name entered");
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      throw Error("Invalid email entered");
    } else if (!/^\d+$/.test(phone)) {
      throw Error("Invalid phone number entered");
    } else if (password.length < 6) {
      throw Error("Password is too short!");
    } else {
      //Good credentials, create user
      const newUser = await createNewUser({
        name,
        phone,
        email,
        password,
      });
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
