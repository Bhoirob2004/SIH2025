const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        require : [true, "Username is mandatory"],
        unique : [true, "Username is already taken"]
    },
    email : {
        type : String,
        require : [true, "Email is mandatory"],
        unique :[true, "Email is already registered"],

    },
    password :{
        type : String,
        require :[true, "Password is mandatory"],
    }

}, {timeStamps: true, })
module.exports = mongoose.model("User", userSchema);
