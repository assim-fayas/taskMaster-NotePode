
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    task_status: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model("Task", taskSchema)