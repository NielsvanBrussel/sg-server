const User = require("../models/User")
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')

const registerUser = async (req, res) => {                           // route for testing

    try {

        console.log(req.body)
        const name = req.body.name
        const password = req.body.password
        const refresh_id = uuidv4()

        const nameLowercase = name.toLowerCase()

        // check if username is not already in use
        const checkIfExists = await User.findOne({ name: nameLowercase }).exec()

        if (!checkIfExists) {

            // generate a salt and hash the password
            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password, salt)  

            // create the user
            const user = new User({ name: nameLowercase, password: hashedPassword, achievements: [], refresh_id: refresh_id })
            await user.save()
            return res.status(201).send('User created.')            
        } else {
            return res.status(400). send('Username already in use.')
        }


    } catch (error) {

        console.log(error)
        
        const err = error.errors
       
        if (err?.name?.kind) {
            if (err.name?.kind === 'required' || err.password?.kind === 'required') {
                return res.status(400).send('missing required field')
            }
            if (err.name?.kind === 'minlength' || err.name?.kind === 'maxlength') {
                return res.status(400).send('name or password is not accepted')
            }            
        }
        return res.status(400).send('Error')

    }

}


const test = async (req, res) => {
    return res.status(200).send("test completed")
}




module.exports = {
    registerUser,
    test
}
