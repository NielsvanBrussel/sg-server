const router = require ('express').Router()
const authController = require("../controllers/authController");
// const { checkToken } = require('../middleware/auth')






// router.get('/', checkToken, userController.getUser);


router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/refresh', authController.refreshToken)


// router.delete('/delete', checkToken, userController.deleteUser);



module.exports = router;