//this is feature - 1 branch
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())  //automatic parse incoming json to an object
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

const bcrypt = require('bcryptjs')

const myFunction = async () => {
    const password = 'Red12345!'
    const hashedPsw = await bcrypt.hash(password, 8)

    console.log(password)
    console.log(hashedPsw)

    const isMatch = await bcrypt.compare('Red12345!', hashedPsw)
    console.log(isMatch)
}

myFunction()