const mongoose = require('mongoose')
const User = require('./User')


const StatsSchema = new mongoose.Schema({
    maxHitpoints: {
        type: Number, 
        required: true
    },
    currentHitpoints: {
        type: Number,
        required: true
    },
    strength: {
        type: Number,
        required: true
    },
    stamina: {
        type: Number,
        required: true
    },
    intellect: {
        type: Number,
        required: true
    },
    intimidation: {
        type: Number,
        required: true
    },
})

const SavegameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        default: null,
    },
    money: {
        type: Number,
        default: 20
    },
    day: {
        type: Number,
        default: 1
    },
    items: { 
        type: [String]
    },
    unlocks: {
        type: [String]
    },
    stats: {
        type: StatsSchema,
        required: true,
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