const router = require('express').Router();
const taskController = require("../controllers/taskController");

router.post("/create-task", taskController.createTask)
router.get("/get-tasks", taskController.getAllTasks)
router.get("/get-task/:id", taskController.getSingleTask)
router.put("/update-task/:id", taskController.updateTask)
router.put("/update-task/:id/complete", taskController.markCompleteTask)
router.delete("/delete-task/:id", taskController.deleteTask)
router.get("/search/:query", taskController.searchTask)

module.exports = router;