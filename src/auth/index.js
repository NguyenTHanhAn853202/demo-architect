const jwt = require("jsonwebtoken");
const { TOKEN_KEY } = require("../utils/secret");

const authen = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);

        const isAuthenticated = jwt.verify(token, "TOKEN_KEY");
        if (!isAuthenticated)
            return res.status(401).json({
                status: "error",
                message: "Authorization token missing",
            });
        req.user = isAuthenticated;
        next();
    } catch (error) {
        console.log(error.message);

        return res.status(401).json({
            status: "error",
            message: "Invalid token or unauthorized access",
        });
    }
};

module.exports = authen;
