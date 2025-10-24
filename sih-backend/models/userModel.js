const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : [true, "Username is mandatory"],
        unique: [true, "Username is already taken"]
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

}, {timestamps: true })
module.exports = mongoose.model("User", userSchema);
