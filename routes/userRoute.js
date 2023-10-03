const router = require ('express').Router()
const userController = require("../controllers/userController");
// const { checkToken } = require('../middleware/auth')


// router.get('/', checkToken, userController.getUser);


router.post('/', userController.registerUser);


// router.delete('/delete', checkToken, userController.deleteUser);



module.exports = router;