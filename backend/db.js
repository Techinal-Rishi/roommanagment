const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || "mongodb+srv://rishijogani046_db_user:FpelBtdXAfyNoRiA@cluster0.iu6brir.mongodb.net/";

const connectToMongo = async () => {

    try{
       await mongoose.connect(mongoURI)
        console.log("Connected to Mongo Successfully");
    } catch(err){
        console.error("Mongoose connection error: ", err);
    }
};

module.exports = connectToMongo;