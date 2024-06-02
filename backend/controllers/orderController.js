const orderService = require("../Services/orderService")

const orderController = {
    createOrder: async (req, res) => {
        try {
            const response = await orderService.createOrder(req.headers.token.split(" ")[1], req.body)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getUserOrder: async (req, res) => {
        try {
            const response = await orderService.getUserOrder(req.headers.token.split(" ")[1])
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = orderController