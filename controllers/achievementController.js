const User = require("../models/User")


const updateAchievement = async (req, res) => {                        

    try {
        const user_id = req.user
        const data = req.body.data

        const property = `achievements.${data}`;

        const update = await User.updateOne(
            { _id: user_id },
            { $set: { [property]: true } })
            .exec()
   
        if (update.acknowledged) {
            return res.status(200).send("achievements updated")  
        } else {
            return res.status(400).send('Error')
        }

    } catch (error) {
        return res.status(400).send('Error')
    }
}


const getAchievements = async(req, res) => {

    const user_id = req.user

    try {
        const user = await User.findOne({ _id: user_id }).exec()
        return res.status(201).send(user.achievements);
    } catch (error) {
        return res.status(400).send('Error')
    }

}


module.exports = {
    updateAchievement,
    getAchievements,
}
