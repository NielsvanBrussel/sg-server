const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const { v4: uuidv4 } = require('uuid')
const User = require("../models/User")


dotenv.config({path: './config/.env'})

// creating tokens


// access token

const createAccessToken = async (user_id) => {

    const payloadAccess = {
        user: user_id
    }

    return jwt.sign(payloadAccess, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "10s"})
}

// refreshtoken

const createRefreshToken = async (user_id) => {

    // besides the user_id, the refreshtoken also has the refresh_id as payload
    const refresh_id = uuidv4()


    try {

        // refreshID gets stored in the database to compare between sessions

        const res = await User.updateOne({ _id: user_id }, { refresh_id: refresh_id })

        const payloadRefresh = {
            user: user_id,
            refresh_id: refresh_id
        }     

        return jwt.sign(payloadRefresh, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "28d"})            
         
    } catch (error) {
        console.log(error)
        return error
    }

}

// token to reset user password


module.exports = {
    createAccessToken,
    createRefreshToken,
}
