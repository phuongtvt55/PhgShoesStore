const userService = require("../Services/userService")

const userController = {
    getAll: async (req, res) => {
        try {
            const response = await userService.getAll()
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getById: async (req, res) => {
        try {
            const response = await userService.getById(req.params.id)
            const { password, ...newResponse } = response._doc
            res.status(200).json(newResponse)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    updateUser: async (req, res) => {
        try {
            const response = await userService.updateUser(req.params.id, req.body)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    deleteUser: async (req, res) => {
        try {
            const response = await userService.delteUser(req.params.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    getWishList: async (req, res) => {
        try {
            const response = await userService.getWishList(req.headers.token.split(" ")[1])
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    addWishList: async (req, res) => {
        try {
            const response = await userService.addWishList(req.headers.token.split(" ")[1], req.body.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    removeWishList: async (req, res) => {
        try {
            const response = await userService.removeWishList(req.headers.token.split(" ")[1], req.body.id)
            res.status(200).json(response)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = userController