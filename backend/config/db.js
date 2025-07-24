const mongoose = require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {});
        console.log("MongoDB Connected");
    }
    catch(e){
        console.error("Error connecting to MongoDB", e)
        process.exit(1);
    }
};

module.exports=connectDB;