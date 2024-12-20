const express = require('express');
const db = require('./db');
const routes = require('./routes');
const compression = require('compression');
const User = require("./models/user");
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('./utils/secret');
const morgan = require('morgan');

const app = express();

app.use(express.json()); 
app.use(morgan("dev"))

db.sync({force:false})

app.use(compression(7))

routes(app)

async function load(){
    let user = await User.findOne({
        where:{
            userName:"nguyenthanhan",
            password:"Thanhan123@",
            email:"nguyenthanhanqt@gmail.com"
        }
    })
    if(!user){
        user = await User.create({
            userName:"nguyenthanhan",
            password:"Thanhan123@",
            email:"nguyenthanhanqt@gmail.com"
        })
        console.log("User created");
    }
    
    const token = jwt.sign(user.dataValues,TOKEN_KEY,{expiresIn:"30d"})
    console.log(token);
    
}
load()

app.listen(5001,()=>{
    console.log("listening on port");
    
})