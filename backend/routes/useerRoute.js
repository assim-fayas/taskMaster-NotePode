const express = require('express')
const userRoute = express.Router()

const userController = require("../controller/userController")
const taskController = require('../controller/taskcontroller')

const authMiddleware = require('../middleware/auth')


userRoute.post('/register', userController.userSignup)
userRoute.post('/login', userController.userLogin)

userRoute.get('/listTask', authMiddleware, taskController.listTask)
userRoute.post('/addTask', authMiddleware, taskController.createTask)
userRoute.get('/editTask/:id', authMiddleware, taskController.editTask)
userRoute.patch('/updateTask/:id', authMiddleware, taskController.updateTask)
userRoute.patch('/changeStatus/:id',authMiddleware,taskController.changeStatusOfTask)
userRoute.delete('/deleteTask/:id', authMiddleware, taskController.deletetask)
module.exports = userRoute