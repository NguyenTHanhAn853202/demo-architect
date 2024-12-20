const { hash, compare } = require("../utils/hashPassword");
const jwt = require("jsonwebtoken")

const User = require("../models/user");
const { TOKEN_KEY } = require("../utils/secret");

const register = async(req,res)=>{
    try {
        const {userName,password,repeat_password} = req.body
        if(password !== repeat_password)
            return res.status(400).json({message: "Passwords do not match"});
        
        const is_user = await User.findOne({where:{userName:userName}})

        if(is_user) 
            return res.status(400).json({message: "Email already exists"});
        const hash_password = hash(password)
        const user = new User({userName:userName,password:hash_password})
        await user.save()
        return res.json({message: "User registered successfully"})
    } catch (error) {
        console.log(error);
        
        return res.status(400).json({message: error.message});
    }
}

const login = async(req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({where:{userName:username}})
        const password_hash = user.dataValues.password
        if(!user){
            return res.status(400).json({
                message: "Invalid username or password"
            })
        }
        if(compare(password,password_hash)){
            const token = jwt.sign(user.dataValues,TOKEN_KEY,{expiresIn:"30d"})
            return res.status(200).json({
                message: "Login Successful",
                token: token
            })
        }
        return res.status(400).json({
            message: "Invalid username or password"
        })
    }
    catch(error){
        return res.status(400).json({message: error.message});
    }
}



module.exports = {register,login}