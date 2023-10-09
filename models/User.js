const mongoose = require('mongoose')


const AchievementSchema = new mongoose.Schema({
    firstTimePlaying: { 
        type: Boolean,
        default: false
    },
    billyTheKid: { 
        type: Boolean,
        default: false
    },
    gladiator: { 
        type: Boolean,
        default: false
    },
    cook: { 
        type: Boolean,
        default: false
    },
    maxLevel: { 
        type: Boolean,
        default: false
    },
    pigsTruffle: { 
        type: Boolean,
        default: false
    },

}, { _id : false })

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
        type: AchievementSchema,
        default: () => ({}),
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