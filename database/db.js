const mongoose = require('mongoose');

const connectDB = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("MongoDB connected!")
    })
}

module.exports = connectDB;