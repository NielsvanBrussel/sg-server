const User = require("../models/User")


const updateAchievement = async (req, res) => {                           // route for testing

    try {
        const user_id = req.user
        const data = req.body.data

        const update = await User.updateOne({ _id: user_id }, { achievements: data }).exec()
       
        if (update.acknowledged) {
            return res.status(200).send("achievements updated")  
        } else {
            return res.status(400).send('Error')
        }


    } catch (error) {
        return res.status(400).send('Error')
    }

}




module.exports = {
    updateAchievement,
}
