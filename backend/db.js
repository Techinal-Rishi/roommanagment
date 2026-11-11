const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/roommanagment";

const connectToMongo = async () => {

    try{
       await mongoose.connect(mongoURI)
        console.log("Connected to Mongo Successfully");
    } catch(err){
        console.error("Mongoose connection error: ", err);
    }
};

module.exports = connectToMongo;