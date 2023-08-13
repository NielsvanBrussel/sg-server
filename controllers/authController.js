const User = require("../models/User")
const bcrypt = require('bcrypt')

const { createAccessToken, createRefreshToken } = require("../utility/jwtGenerator")
const { resetUserExpiredRefreshToken, verifyRefreshToken, verifyExpiredAccessToken } = require("../utility/jwtVerifier")

const login = async (req, res) => {   


                       
        const name = req.body.name
        const password = req.body.password 
    
        try{

            const nameLowercase = name.toLowerCase()     
            const user = await User.findOne({ name: nameLowercase }).exec()
           
            if(user) {

                // hash the pw from input and compare it to the one in the db 
                const hashedPassword = user.password  
                const validPassword = bcrypt.compareSync(password, hashedPassword)                 

                if (!validPassword) { 
                    return res.status(401).send("Invalid password or email!")
                }
                
                else {

                    const user_id = user._id
                    const accessToken = await createAccessToken(user_id);              // generate a token and send it in the header
                    const refreshToken =  await createRefreshToken(user_id)


                    // send refreshtoken (long duration) in cookies and accesstoken (short duration) in header

                    
                    res.cookie("acp64", refreshToken, {
                        maxAge: 1000 * 60 *60 * 24 * 30,   // 1 month
                        httpOnly: true,
                        overwrite: true,
                    })

                    return res.status(201).send({accessToken: accessToken, achievements: user.achievements});
                }
                    
            } else {
                return res.status(400).send("User not found")
            }
                
     
    
        } catch (err) {
            console.log(err)
           return res.status(500).send("Server error")
        }

}


const logout = async (req, res) => {                    // log the user out by resetting the refreshtoken and removing the accesstoken



    console.log('logging out')
    const refreshToken = req.cookies.acp64
    try {

        const response = await resetUserExpiredRefreshToken(refreshToken)   // reset the refreshtoken in the database

        if (response) {
            return res.header('auth-token', "").status(202)
        }


        res.cookie("acp64", "", {
                maxAge: 1000 * 60 *60 * 24 * 30,   // 1 month
                httpOnly: true,
                overwrite: true,
        })
    
        return res.header('auth-token', "").status(200).send("logged out")

    } catch (error) {
        return res.header('auth-token', "").status(404).send("logged out")
    }
}


const refreshToken = async (req, res) => {              // endpoint called when the user has an expired accesstoken but valid refreshtoken, return 2 new tokens

    const refreshToken = req.cookies.acp64       // get both the refreshtoken and the accesstoken
    const accessToken = req.header("token");

    if (!refreshToken || !accessToken) {
        return res.status(401).send('missing tokens')
    }

    try {

        // verify accesstoken but still get the user_id
        const { payloadAccess, expiredAccess } = await verifyExpiredAccessToken(accessToken);
        
        // verify the refreshtoken, get the id and make sure it isnt expired
        const { payloadRefresh, expiredRefresh } = await verifyRefreshToken(refreshToken);   
        
         // check if accesstoken expired and refreshtoken is valid

        if (payloadRefresh && (payloadAccess === payloadRefresh)) {
                                                                                                   
            const user_id = payloadRefresh
            const user = await User.findOne({ _id: user_id }).exec()
            console.log(user)
           

        // check if user exists    
            if (!user) {                                                                           
                return res.status(404).send({ ok: false, accessToken: '', achievements: null})
            }
 
        // create new accesstoken & refreshtoken
            const newAccessToken = await createAccessToken(user_id)                                       
        // create new accesstoken & refreshtoken
            const newRefreshToken = await createRefreshToken(user_id)


            res.cookie("acp64", newRefreshToken, {
                maxAge: 1000 * 60 *60 * 24 * 30,                            // 1month                                  
                httpOnly: true,
                overwrite: true,
            })

            return res.status(201).send({ ok: true, user: user, accessToken: newAccessToken, achievements: user.achievements })
        } else {       
            return res.status(400).send({ ok: false, accessToken: '', achievements: null})
        }   
    } catch (error) {
         return res.status(400).send({ ok: false, accessToken: '', achievements: null})
    }   
}





module.exports = {
    login,
    logout,
    refreshToken,
}
