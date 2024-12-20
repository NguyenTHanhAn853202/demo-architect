const express = require("express");
const db = require("./db");
const routes = require("./routes");
const compression = require("compression");
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('./utils/secret');
const morgan = require('morgan');
const backup = require('./backup');
const ping = require('./middleware/ping');

const app = express();

app.use(express.json());
app.use(morgan("dev"));

db.sync({ force: false });

app.use(compression(7));

app.use(ping)

routes(app)

const time_backup = 24*60*60 *1000

setInterval(backup,time_backup)

async function load(){
    let user = await User.findOne({
        where: {
            userName: "nguyenthanhan",
            password: "Thanhan123@",
            email: "nguyenthanhanqt@gmail.com",
        },
    });
    if (!user) {
        user = await User.create({
            userName: "nguyenthanhan",
            password: "Thanhan123@",
            email: "nguyenthanhanqt@gmail.com",
        });
        console.log("User created");
    }

    const token = jwt.sign(user.dataValues, "TOKEN_KEY", { expiresIn: "30d" });
    console.log(token);
}
load();
const { createClient } = require("redis");
const redisClient = createClient();
redisClient.connect().catch(console.error);

(async () => {
    const keys = await redisClient.keys("*");
    if (keys.length === 0) {
        return res.status(200).json({ message: "No data found in cache." });
    }

    const values = await redisClient.mGet(keys);

    const result1 = values.map((value) => JSON.parse(value));
    console.log(result1);
})();
app.listen(5001, () => {
    console.log("listening on port");
});
