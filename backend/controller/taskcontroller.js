const Task = require('../model/task')

const listTask = async (req, res) => {
    try {
        console.log("inside list task");
        console.log("query", req.query);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 3;
        const search = req.query.search || '';
        let filter = req.query.filter || 'All';
        const user = req.headers.userId;
        const skip = (page - 1) * limit;
        console.log('page:', page, 'limit: ', limit, 'skip: ', skip);

        let filterCondition = {}; // Initialize an empty object for filter condition

        // Check if filter is not 'All', then set filter condition
        if (filter !== 'All') {
            filterCondition = { task_status: filter };
        }

        console.log(filterCondition, "filterCondition");

        const allTask = await Task.find({
            user: user,
            $and: [
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } }

                    ]
                },
                filterCondition
            ]
        }).skip(skip).limit(limit);

        const total = await Task.countDocuments({ user });

        console.log(allTask);
        if (allTask) {
            return res.status(200).json(allTask);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "task listing failed" });
    }
}

const createTask = async (req, res) => {
    try {

        const { title, description, dueDate, status } = req.body
        console.log(req.body);
        const user = req.headers.userId
        const task = new Task({
            user: user,
            title: title,
            description: description,
            due_date: dueDate,
            task_status: status
        })

        const taskCreated = await task.save()
        if (taskCreated) {
            return res.status(201).send({ message: "Task created successfully" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error })
    }
}



const editTask = async (req, res) => {
    try {
        console.log("inside edit task");
        // const taskId = req.params.id
        const user = req.headers.userId
        const taskId = req.params.id
        const task = await Task.findOne({ _id: taskId, user: user })
        console.log(task);
        if (!task) {
            return res.status(403).send("acces forbidden")
        }
        return res.json(task);
    } catch (error) {
        return res.status(500).send({ message: "task editing faild" })

    }
}

const updateTask = async (req, res) => {
    try {
        console.log("inside update task");
        const taskId = req.params.id
        const user = req.headers.userId

        const task = await Task.findOne({ _id: taskId, user: user })
        console.log(task);
        if (!task) {
            return res.status(404).send("task not found")
        }
        const { title, description, due_date, status } = req.body;
        const updateTask = await Task.updateOne({ _id: taskId }, { $set: { user: user, title: title, description: description, due_date: due_date, task_status: status } })
        console.log(updateTask);
        if (updateTask) {
            return res.status(200).send({ message: "Task updated Successfully" })
        } else {
            return res.status(304).send({ message: "No chage made" })
        }
    } catch (error) {
        return res.status(500).send({ message: "task editing faild" })

    }
}

const deletetask = async (req, res) => {
    try {
       
        const taskId = req.params.id
        const user = req.headers.userId
        const task = await Task.findOne({ _id: taskId, user: user })
        if (!task) {
            return res.status(403).send("acces forbidden")
        }
        const deleteTask = await Task.findByIdAndDelete({ _id: taskId })
        if (deleteTask) {
            return res.status(200).send({ message: "Task Deleted Successfully" })
        } else {
            return res.status(404).send("Task Not Deleted")
        }

    } catch (error) {
        return res.status(500).send({ message: "post deleting faild" })
    }
}
const changeStatusOfTask=async(req,res)=>{
    try {
        console.log("change status");
        const status=req.body.status
        const taskId=req.params.id
        const changeStatusOFTask= await Task.findByIdAndUpdate({_id:taskId},{$set:{task_status:status}})
        console.log(changeStatusOFTask);
        if(changeStatusOFTask){
            return  res.status(200).send({message:"status changed susscessfully"})
        } else {
            return res.status(404).send("status not updated")
        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:"error in status changing"})
    }
}


module.exports = {
    createTask,
    editTask,
    updateTask,
    deletetask,
    listTask,
    changeStatusOfTask
}   