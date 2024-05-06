const authController = require("../controllers/authController")
const router = require("express").Router()

router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)
router.get('/refresh', authController.refreshToken)
module.exports = router