const router = require ('express').Router()
const savegameController = require("../controllers/savegameController");
const { checkToken } = require('../middleware/auth')






// router.get('/', checkToken, userController.getUser);


router.post('/', checkToken, savegameController.createSavegame);
router.get('/', checkToken, savegameController.getSavegames);
router.put('/', checkToken, savegameController.updateSavegame);


// router.delete('/delete', checkToken, userController.deleteUser);



module.exports = router;