const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { 
        type: String,
        minLength: 2,
        maxLength: 16,
        required: true
    },
    password: { 
        type: String,
        required: true,
    },
    refresh_id: {
        type: String,
        required: true
    },
    achievements: {
        type: [String]
    },
    date_created: { 
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    date_active: { 
        type: Date,
        default: Date.now 
    },
})


module.exports = mongoose.model('User', UserSchema)