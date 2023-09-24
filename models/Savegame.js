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
    luck: {
        type: Number,
        required: true
    },
})

const UnlocksSchema = new mongoose.Schema({
    hospitalVisits: {
        type: Number, 
        default: 0
    },
    missingKidney: {
        type: Boolean,
        default: false
    },
    billy: {
        type: Number,
        default: 0
    },
    transportRobbery: {
        type: Number,
        default: 0
    },
    growingWeed: {
        type: Number,
        default: 0
    },
    methLab: {
        type: Number,
        default: 0
    },
    cult: {
        type: Number,
        default: 0
    },
    organTrade: {
        type: Boolean,
        default: false
    },
    sewers: {
        type: Boolean,
        default: false
    },
    items: {
        type: [String],
        default: []
    }
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
    level: {
        type: Number,
        default: 1
    },
    experience: {
        type: Number,
        default: 0
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
        type: UnlocksSchema,
        required: true,
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