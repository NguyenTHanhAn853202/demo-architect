require("dotenv").config()

const TOKEN_KEY = process.env.TOKEN_KEY
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL
const EMAIL = process.env.EMAIL

module.exports = {
    TOKEN_KEY,
    PASSWORD_EMAIL,
    EMAIL
}