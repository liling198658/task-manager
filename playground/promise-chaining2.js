require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('60076f620f68f30bb41eb7c9').then((task) => {
//     console.log(`${task} is removed`)
//     return Task.countDocuments({completed: false})
// }).then((count) => {
//     console.log(`${count} tasks didn't complete`)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteTaskAndCount('6004fb36cd6c9b314c8d0353', false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})