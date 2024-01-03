const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
        default: "Pending"
    }
})

const Task = mongoose.model('task', taskSchema);
module.exports = Task;