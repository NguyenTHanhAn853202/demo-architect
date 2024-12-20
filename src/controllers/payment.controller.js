const Payment = require("../models/payment")

const payment = async (req, res) => {
    try {
        const pay = await Payment.create({
            userId:req.user.userId,
            productId:req.body.productId,
            amount:req.body.amount,
        })
        return res.json(pay)
    } catch (error) {
        logger.warn("Payment Error: " + error.message)
        sendEmail({
            to:req.user.email,
            subject:"Payment Failed",
            text:`Payment failed for product: ${req.body.productId} with amount: ${req.body.amount}`
        })
        sendEmail({
            to:"admin@gmail.com",
            subject:"Payment Failed",
            text:`Payment failed for product: ${req.body.productId} with amount: ${req.body.amount}`
        })
    }
}

module.exports = {payment}