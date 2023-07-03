const express = require("express");
const router = express.Router();
const { sendPasswordResetEmailOTP } = require("./controller");

router.post("/", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw Error("n email is required.");

        const createdPasswordResetOTP = await sendPasswordResetEmailOTP(email);
        res.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;