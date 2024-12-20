const productRoute = require("../routes/product.routes")
const payment = require("../routes/payment.routes")
const user = require("../routes/user.routes")

function routes(app) {
    app.use("/api/product",productRoute)
    app.use("/api/payment", payment)
    app.use("/api/user",user)
}

module.exports = routes