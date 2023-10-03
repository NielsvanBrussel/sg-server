const router = require ('express').Router()
const userController = require("../controllers/userController");
const { checkToken } = require('../middleware/auth')


router.post('/', checkToken, achievementController.updateAchievement);




module.exports = router;