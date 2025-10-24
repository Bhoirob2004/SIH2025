const asyncHandler = require("express-async-handler");

const crop = require("../models/inputModel");
const rules = require("../data/cropRules.json");

//Description get input data 
//route POST /api/input

const getData = asyncHandler(async(req,res) =>{
    const {location , period, soilType, cropPreferance, irrigation} = req.body;
    if(!location || !period || !irrigation){
        res.status(400);
        throw new Error("The above fields the mandatory");
    }

    const input = await crop.create({
        location,
        period,
        soilType,
        cropPreferance,
        irrigation,
    });

    let recommended = "Wheat";
    let confidence = 60;

     const match = rules.find((r) =>
      (!soilType || r.soilType.toLowerCase() === soilType.toLowerCase()) &&
      (!irrigation || r.irrigation.toLowerCase() === irrigation.toLowerCase()) &&
      (!period || r.period.toLowerCase() === period.toLowerCase())
  );

  if(match){
    recommended = match.crop;
    confidence = match.confidence;
  }

  let message = `Based on the Location : ${location} , Period : ${period}, soilType : ${soilType}, irrigation : ${irrigation}`

  res.status(201).json({
    success : true,
      data: {
      input,
      recommended,
      confidence: `${confidence}%`,
      message,
    },
  });
});

//description get History
//route GET api/crop/history

const getHistory = asyncHandler(async (req, res) => {
  const history = await crop.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: history.length,
    data: history,
  });
});

module.exports = {getData, getHistory};