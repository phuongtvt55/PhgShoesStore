const authService = require("../Services/authService")

const authController = {
    registerUser: async (req, res) => {
        try {
            const response = await authService.register(req.body)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    loginUser: async (req, res) => {
        try {
            const response = await authService.login(req.body)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    refreshToken: async (req, res) => {
        try {
            const response = await authService.refreshToken(req.headers.token?.split(" ")[1])
            console.log(response)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = authController