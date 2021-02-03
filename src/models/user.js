// middleware is a way to customize the behavior of my mongoose model

const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('The string has password in it')
            }
        }

    }
})

userSchema.pre('save', async function (next) {           //using standard function because of binding this
    const user = this

    console.log('Just before saving!')
    
    next()
})

const User = mongoose.model('User', userSchema)


module.exports = User