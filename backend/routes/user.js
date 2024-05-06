const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const router = require("express").Router()

router.get("/", userController.getAll)
router.get("/:id", authMiddleware.checkIsUser, userController.getById)
router.patch("/:id", userController.updateUser)
router.delete("/:id", authMiddleware.checkAdmin, userController.deleteUser)

module.exports = router