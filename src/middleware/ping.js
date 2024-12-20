const db = require("../db")

const ping = async(req,res,next)=>{
    try {
        await db.authenticate()
        next()
    } catch (error) {
        return res.status(400).json({message: "server is maintenance"})
    }
}

module.exports = ping