const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is mandatory"],
        uniqued: [true, "Username is already taken"]
    },
    email : {
        type : String,
        required : [true, "Email is mandatory"],
        unique :[true, "Email is already registered"],

    },
    password :{
        type : String,
        required :[true, "Password is mandatory"],
    }

}, {timeStamps: true, })
module.exports = mongoose.model("User", userSchema);
