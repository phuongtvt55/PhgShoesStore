const orderController = require("../controllers/orderController")
const router = require("express").Router()

router.post("/", orderController.createOrder)
router.get("/", orderController.getUserOrder)

module.exports = router