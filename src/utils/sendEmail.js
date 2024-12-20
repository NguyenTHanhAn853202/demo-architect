const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD_EMAIL } = require("../utils/secret");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD_EMAIL
    }
});

const sendEmail = async (mailOptions) => {
    try {
        console.log(EMAIL, PASSWORD_EMAIL);
        
        const options = { ...mailOptions, from: EMAIL };
        const response = await transporter.sendMail(options);
        return response;
    } catch (error) {
        return false;
    }
};

module.exports = { sendEmail };
