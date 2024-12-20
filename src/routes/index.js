const productRoute = require("../routes/product.routes")
const payment = require("../routes/payment.routes")

function routes(app) {
    app.use("/api/product",productRoute)
    app.use("/api/payment", payment)
}

module.exports = routes