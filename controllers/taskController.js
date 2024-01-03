const tasks = require("../model/taskModel")

const createTask = async (req, res) => {
    // check incoming data
    console.log(req.body);

    //destructuring the data
    const {name, description, deadline, priority} = req.body

    //validate the data
    if (!name || !description || !deadline || !priority){
        return res.json({
            success: false,
            message: "Please fill all fields."
        })
    }

    try {
        const newTask = new tasks({
            name : name,
            description : description,
            deadline : deadline,
            priority : priority,
        });

        //step 7: save the user
        await newTask.save();
        res.status(200).json({
            success: true,
            message: "Task added successfully!",
            data: newTask
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
}

const getAllTasks = async (req, res) => {
    try {
        const listOfTasks = await (tasks.find({}));
        res.json({
            success: true,
            message: "Tasks fetched successfully",
            tasks: listOfTasks
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error")
    }
}

const getSingleTask = async (req, res) => {
    const id = req.params.id
    if (!id){
        return res.json({
            success: false,
            message: "Task id is required!"
        })
    }
    try {
        const singleTask = await tasks.findById(id);
        res.json({
            success: true,
            message: "Task fetched successfully",
            task: singleTask
        })
    } catch (error){
        console.log(error);
        res.status(500).json("Server Error")
    }
}

const markCompleteTask = async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await tasks.findById(taskId);

        if (!task) {
            return res.json({
                success: false,
                message: 'Task not found'
            });
        }

        task.status = 'Completed';

        const updatedTask = await task.save();

        res.json({
            success: true,
            message: 'Task marked as completed',
            task: updatedTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
}

const searchTask = async (req, res) => {
    const query = req.params.query;
    try {
      const filteredTasks = await tasks.find({ name: { $regex: query, $options: 'i' } });
      res.json({
        success: true,
        message: 'Tasks fetched successfully',
        tasks: filteredTasks,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server Error',
      });
    }
}

const updateTask = async (req, res) => {
    const id = req.params.id
    if (!id){
        return res.json({
            success: false,
            message: "Task id is required!"
        })
    }

    //destructuring the data
    const {name, description, deadline, priority} = req.body

    //validate the data
    if (!name || !description || !deadline || !priority){
        return res.json({
            success: false,
            message: "Please fill all fields!"
        })
    }

    try{
            const updatedTask = await tasks.findByIdAndUpdate(id, {
                name : name,
                description : description,
                deadline : deadline,
                priority : priority,
            })
            res.status(200).json({
                success: true,
                message: "Task updated!",
                data: updatedTask
            })
        
    } catch (error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        })        
    }
}

const deleteTask = async (req, res) => {
    try {
        const deletedTask = await tasks.findByIdAndDelete(req.params.id);
        if (!deletedTask){
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            })
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error!"
        })
    }
}

module.exports = {
    createTask, getAllTasks, getSingleTask, markCompleteTask, updateTask, deleteTask, searchTask
}