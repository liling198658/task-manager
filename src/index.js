//this is feature - 1 branch
const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const userRouter = require('./routers/users')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())  //automatic parse incoming json to an object
app.use(userRouter)

app.delete('/tasks/:id', async (req, res) => {
    try {
        const taskToDelete = await Task.findByIdAndDelete(req.params.id)
        
        if (!taskToDelete) {
            return res.status(404).send()
        }

        res.send(taskToDelete)
    } catch (e) {
        res.status(500).send()
    }
})

app.patch('/tasks/:id', async (req, res) => {
    const updateInput = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updateInput.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(505).send(e)
    }
})
    

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(505).send(e)
    }
})
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})