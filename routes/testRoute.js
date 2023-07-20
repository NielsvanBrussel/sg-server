const router = require ('express').Router()
const userController = require("../controllers/userController");
// const { checkToken } = require('../middleware/auth')






router.get('/', userController.test);

module.exports = router;