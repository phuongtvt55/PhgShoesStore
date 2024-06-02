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
            const { refresh_token, ...newResponse } = response
            res.cookie("refresh_token", response.refresh_token, {
                httpOnly: true,
                secure: false,
                samesite: "strict"
            })
            return res.status(200).json(newResponse)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("refresh_token")
            return res.status(200).json({
                "messages": "Logout successfully"
            })
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    refreshToken: async (req, res) => {
        try {
            //console.log(res.cookies)
            const response = await authService.refreshToken(req.cookies?.refresh_token)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = authController