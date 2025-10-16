const asyncHandler = require("express-async-handler");

//Check crop api is running or not;
const check = asyncHandler(async(req,res)=>{
    res.json({status:"ok", message:"Crop recommendation is running"});
});

const recommendedCrop = asyncHandler(async(req,res)=>{
    const {location, season, irrigation, soilType} = req.body ; 
     let crop = "Rice";

     // we will now call the ML model to give the crop and give output
     

     res.json({
        crop, message : `Base on soil : ${soilType}, irrigation : ${irrigation}, season: ${season} and location: ${location}
         the recommend crop is ${crop} `
     });
   
});

module.exports={check,recommendedCrop};