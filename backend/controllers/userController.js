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
            res.status(200).json(response)
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
    }
}

module.exports = userController