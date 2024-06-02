const addressController = require("../controllers/addressController")
const router = require("express").Router()

router.post("/", addressController.createAddress)
router.get("/", addressController.getAll)
router.delete("/:id", addressController.deleteAddres)
router.get("/:id", addressController.setAsDefault)

module.exports = router