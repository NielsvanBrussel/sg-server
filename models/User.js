const mongoose = require('mongoose')


const AchievementSchema = new mongoose.Schema({
    firstTimePlaying: { 
        type: Boolean,
        required: true, 
        default: false
    },
    billyTheKid: { 
        type: Boolean,
        required: true, 
        default: false
    },
    gladiator: { 
        type: Boolean,
        required: true, 
        default: false
    },
    cook: { 
        type: Boolean,
        required: true, 
        default: false
    },
    maxLevel: { 
        type: Boolean,
        required: true, 
        default: false
    },
    pigsTruffle: { 
        type: Boolean,
        required: true, 
        default: false
    },

})

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
        required: true
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