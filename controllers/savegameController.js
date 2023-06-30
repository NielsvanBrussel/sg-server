const User = require("../models/User")
const Savegame = require("../models/Savegame")
const { v4: uuidv4 } = require('uuid')

const createSavegame = async (req, res) => {                    

    try {

        const user_id = req.user
        const data = req.body.savegame

        const checkSaveAmount = await Savegame.find({ user: user_id }).exec()

        // only allow 5 saveslots per user

        if (checkSaveAmount.length < 5) {
            const savegame = new Savegame({ user: user_id, hitpoints: data.hitpoints, items: data.items, date_created: data.date_created })
            await savegame.save()   
            return res.status(200).send("savegame created")         
        } else {
            return res.status(400).send("maximum amount of saves reached")
        }


    } catch (error) {
        return res.status(400).send("Error")
    }

}

const updateSavegame = async (req, res) => {                    

    try {

        const user_id = req.user
        const data = req.body.savegame
        console.log(data)
        const date = new Date()

        const update = await Savegame.updateOne({ _id: data._id }, { hitpoints: data.hitpoints, items: data.items, date_active: date}).exec()
        if (update.acknowledged) {
            return res.status(200).send("savegame updated")  
        } else {
            return res.status(400).send('Error')
        }

    } catch (error) {
        return res.status(400).send("Error")
    }

}

const getSavegames = async (req, res) => {                    

    try {

        const user_id = req.user

        const savegames = await Savegame.find({ user: user_id }).exec()

        const data = {
            savegames: savegames,
            empty: savegames? false : true
        }

        return res.status(200).send(data) 

    } catch (error) {
        return res.status(400).send("Error")
    }

}




module.exports = {
    createSavegame,
    updateSavegame,
    getSavegames,
}
