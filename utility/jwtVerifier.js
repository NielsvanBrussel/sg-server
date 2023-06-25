const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')
const { v4: uuidv4 } = require('uuid')
const User = require("../models/User")

dotenv.config({path: './config/.env'})



// verify tokens, returning the user_id (or a specific error message if it expired)

const verifyAccessToken = async (token) => {

    if(!token){
        return null
    } else {
        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // get the user from jwt
            const user_id = verified.user

            return { payloadAccess: user_id, expiredAccess: false };
        } catch (error) {
            return { payloadAccess: null, expiredAccess: error.message.includes("jwt expired") };
        }
    }
} 


const verifyRefreshToken = async (token) => {

    if(!token){
        return null
    } else {
        try {
            const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); // get the user from jwt
            const user_id = verified.user
            const refresh_id = verified.refresh_id

            const user = await User.findOne({ _id: user_id }).exec()
         
            if (user.refresh_id === refresh_id) {
                return { payloadRefresh: user_id, expiredRefresh: false };
            } else return { payloadRefresh: null, expiredRefresh: false };

        } catch (error) {
            return { payloadRefresh: null, expiredRefresh: error.message.includes("jwt expired") };
        }
    }
}


// when logout endpoint is called reset the refreshID in the database, rendering the refreshtoken invalid


const resetUserExpiredRefreshToken = async (token) => {

    if(!token){
        return null
    } else {
        try {

            const verified = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, {ignoreExpiration: true}); // get the user from jwt
            const user_id = verified.user
            const refresh_id = uuidv4()
            const res = await User.updateOne({ _id: user_id }, { refresh_id: refresh_id })
            return false

        } catch (error) {
            return true;
        }
    }
}


// get the user_id from the expired accesstoken (so you can compare it to the user_id from the refreshtoken)

const verifyExpiredAccessToken = async (token) => {

    if(!token){
        return null
    } else {
        try {
            const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {ignoreExpiration: true}); // get the user from jwt
            const user_id = verified.user

            return { payloadAccess: user_id, expiredAccess: true };
        } catch (error) {
            return { payloadAccess: null, expiredAccess: error.message.includes("jwt expired") };
        }
    }
} 


module.exports = {
    verifyAccessToken,
    verifyRefreshToken,
    resetUserExpiredRefreshToken,
    verifyExpiredAccessToken,
}