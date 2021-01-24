require('../src/db/mongoose')
const User = require('../src/models/user')



// User.findByIdAndUpdate('6006580bbb22dd3968fa8b6f', { age: 2 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({age:1})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age: age})
    const count = await User.countDocuments({age: 1})
    return count
}

updateAgeAndCount('6006580bbb22dd3968fa8b6f', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})