const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const router = require("express").Router()

router.get("/wishList", userController.getWishList)
router.post("/wishList", userController.addWishList)
router.post("/removeWishList", userController.removeWishList)
router.get("/", userController.getAll)
router.get("/:id", authMiddleware.checkIsUser, userController.getById)
router.patch("/:id", userController.updateUser)
router.delete("/:id", authMiddleware.checkAdmin, userController.deleteUser)


module.exports = router