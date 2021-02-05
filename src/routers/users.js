const express = require('express')
const User = require('../models/user')
const router = new express.Router()


router.post('/users', async (req, res) => {       // For signing up
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
    
    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.post('/users/login', async (req, res) => {           // For loging in
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send('Not working')
    }
})

router.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
    
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', async (req, res) => {
    const updateInput = Object.keys(req.body)
    // console.log(updateInput)
    // console.log(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updateInput.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try {
        const user = await User.findById(req.params.id)
        // console.log(user)
        updateInput.forEach((update) => user[update] = req.body[update]) 
        
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.id)
        
        if (!userToDelete) {
            return res.status(404).send()
        }

        res.send(userToDelete)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router