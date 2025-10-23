const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler"); 

const app = express();

connectDb();


app.use(express.json());


app.use("/api/users", require("./routes/userRoutes")); 
app.use("/api/crops", require("./routes/cropRoutes"));


app.use(errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
