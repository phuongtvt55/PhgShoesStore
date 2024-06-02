const productService = require("../Services/productService")

const productController = {
    getAll: async (req, res) => {
        try {
            const response = await productService.getAll()
            res.status(200).json(response.product)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    createProduct: async (req, res) => {
        try {
            const response = await productService.createProduct(req.body)
            res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    updateProduct: async (req, res) => {
        try {
            const response = await productService.updateProduct(req.params.id, req.body)
            res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getById: async (req, res) => {
        try {
            const response = await productService.getById(req.params.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const response = await productService.deleteProduct(req.params.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getDiscountProducts: async (req, res) => {
        try {
            const response = await productService.getDiscountProducts(req.body.ids)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = productController