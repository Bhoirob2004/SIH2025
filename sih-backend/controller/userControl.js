const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@description register the user;
//@route POST /api/users/register

const registerUser = asyncHandler(async(req, res) =>{
    const{username, email , password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailabe = await User.findOne({email});
    if(userAvailabe){
        res.status(400);
        throw new Error("The user is already registered");
    }
    
    // HashPassword
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
        username, email, password : hashedPassword
    });

    console.log("Hashed Password", hashedPassword);
    console.log("User is created", user);
    if(user){
        res.status(200).json({_id : user.id, email : user.email})
    }else{
        res.status(400);
        throw new Error("User data is not available"); 

    }
    res.json({message : "Register the user"})
});

//@decription login the user
//@route POST api/user/login

const loginUser = asyncHandler(async(req,res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const user = await User.findOne({email});

    // compare password with hashpassword
    if(user && (await bcrypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id : user.id,
            }
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn :"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Wrong password");
    }
    res.status(200);
    res.json({message : "The user is logined"});

});

module.exports = {registerUser, loginUser};