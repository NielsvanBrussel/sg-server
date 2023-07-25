const mongoose = require('mongoose')
const User = require('./User')

const SavegameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        default: null,
    },
    items: { 
        type: [String]
    },
    hitpoints: {
        type: Number,
        required: true,
        default: 30
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


module.exports = mongoose.model('Savegame', SavegameSchema)