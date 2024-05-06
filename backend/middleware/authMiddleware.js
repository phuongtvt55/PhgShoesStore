const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const authMiddleware = {
    checkAdmin: (req, res, next) => {
        const token = req.headers.token?.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(404).json({
                    "messages": "Authentication",
                })
            }
            if (!user.payload.isAdmin) {
                return res.status(404).json({
                    "messages": "Not an admin"
                })
            }
            next()

        })
    }
}

module.exports = authMiddleware