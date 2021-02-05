const mongoose = require('mongoose')
// const validator = require('validator')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

// taskSchema.pre('save', async function (next) {           //using standard function because of binding this
//     const task = this

//     if (task.isModified('password')) {
//         task.password = await bcrypt.hash(task.password, 8)
//     }
    
//     next()
// })

const Task = mongoose.model('Task', taskSchema)

module.exports = Task