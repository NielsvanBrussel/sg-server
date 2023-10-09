const router = require ('express').Router()
const achievementController = require("../controllers/achievementController");
const { checkToken } = require('../middleware/auth')


router.put('/', checkToken, achievementController.updateAchievement);
router.get('/', checkToken, achievementController.getAchievements);




module.exports = router;