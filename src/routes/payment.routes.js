const express = require('express');
const authen = require('../auth');
const { payment } = require('../controllers/payment.controller');

const router = express.Router()

router.post("/",[authen],payment)

module.exports = router