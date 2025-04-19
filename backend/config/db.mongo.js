const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser :true,
            useUnifiedTopology : true
        });

        console.log("mongodb Connectd Successfully");
    }catch(err){
        console.error("Mongo connection Error: ", err);
        process.exit(1);
    }
}


module.exports = connectDB;


