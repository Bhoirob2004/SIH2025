const mongoose = require("mongoose");

const inputSchema = mongoose.Schema({
    location : {
        type : String,
        required : [true, "Location is mandatory"]
    },
    period : {
        type : String,
        required : [true, "Period is mandatory"]
    },
    soilType : {
        type : String,
        required : false
    },
    cropPreferance :{
        type : String,
        required : false
    },
    irrigation :{
        type : String,
        required : [true, "irrigation is mandatory"]
    }
    }, {timestamps: true})

module.exports = mongoose.model("Input", inputSchema);

 
//estrict possible values (for dropdowns in frontend), you can add enums:

// soilType: {
//   type: String,
//   enum: ["Loamy", "Clay", "Sandy", "Silty"],
//   required: false,
// },
// irrigation: {
//   type: String,
//   enum: ["Rainfed", "Canal", "Drip", "Well"],
//   required: [true, "Irrigation is mandatory"],
// }
