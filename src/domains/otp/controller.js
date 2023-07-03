const OTP = require("./model");
const generateOTP = require("../../utils/generateOTP");
const sendEmail = require("../../utils/sendEmail");
const { hashData } = require("../../utils/hashData");

const { AUTH_EMAIL } = process.env;

const sendOTP = async ({ email, subject, message, duration = 1 }) => {
    try {
        if (!(email && subject && message)) {
            throw Error("Provide value for email, subject and message.");
        }

        // clear old record
        await OTP.deleteOne({ email });

        // generate pin
        const genertaedOTP = await generateOTP();

        // send email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${genertaedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b>.</p>`,
        }
        await sendEmail(mailOptions);

        // save OTP value
        const hashedOTP = await hashData(genertaedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        });

        const createdOTPValue = await newOTP.save();
        return createdOTPValue;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendOTP };