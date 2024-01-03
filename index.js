// Importing
const express = require("express");
const dotenv = require("dotenv")

const mongoose = require('mongoose');
const connectDB = require('./database/db');
const cors = require('cors');

const multiparty = require('connect-multiparty')

// Making express app
const app = express();

// Dotenv config
dotenv.config();

//cors policy
const corsPolicy = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsPolicy))

connectDB();

//json middleware (to accept json data)
app.use(express.json());

app.use(multiparty());

// user routes
app.use('/api/user', require('./routes/userRoutes'))

//task routes
app.use('/api/task', require('./routes/taskRoutes'))

// Defining port
const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
});