const User = require("../models/User")
const bcrypt = require('bcrypt')

const { createAccessToken, createRefreshToken } = require("../utility/jwtGenerator")
const { resetUserExpiredRefreshToken } = require("../utility/jwtVerifier")

const login = async (req, res) => {   

                       
        const name = req.body.name
        const password = req.body.password 
    
        try{

            const nameLowercase = name.toLowerCase()  
            console.log(nameLowercase)    
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
                    const userName = user.name
                    const accessToken = await createAccessToken(user_id);              // generate a token and send it in the header
                    const refreshToken =  await createRefreshToken(user_id)

                    // send refreshtoken (long duration) in cookies and accesstoken (short duration) in header
                    
                    res.cookie("acp64", refreshToken, {
                        maxAge: 1000 * 60 *60 * 24 * 30,   // 1 month
                        httpOnly: true,
                        overwrite: true,
                    })

                    return res.header('auth-token', accessToken).status(201).send(userName);
                }
                    
            } else {
                return res.status(400).send("User not found")
            }
                
     
    
        } catch (err) {
           return res.status(500).send("Server error")
        }

}


const logout = async (req, res) => {                    // log the user out by resetting the refreshtoken and removing the accesstoken


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




module.exports = {
    login,
    logout,
}
