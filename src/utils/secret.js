require("dotenv").config()

const TOKEN_KEY = process.env.TOKEN_KEY
const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL
const EMAIL = process.env.EMAIL
const SATL = process.env.SATL
module.exports = {
    TOKEN_KEY,
    PASSWORD_EMAIL,
    EMAIL,
    SATL
}