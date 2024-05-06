const productController = require("../controllers/productController")
const authMiddleware = require("../middleware/authMiddleware")
const router = require("express").Router()

router.get('/', productController.getAll)
router.get('/:id', productController.getById)
router.post('/', authMiddleware.checkAdmin, productController.createProduct)
router.patch('/:id', productController.updateProduct)
router.delete('/:id', authMiddleware.checkAdmin, productController.deleteProduct)
module.exports = router