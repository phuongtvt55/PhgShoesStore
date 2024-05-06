const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const jwtService = {
    generateAccessToken: async (payload) => {
        try {
            const access_token = jwt.sign({
                payload
            }, process.env.SECRET_KEY, { expiresIn: '1d' })
            return access_token
        } catch (e) {
            console.log(e);
        }
    },
    generateRefreshToken: async (payload) => {
        try {
            const refresh_token = jwt.sign({
                payload
            }, process.env.SECRET_KEY, { expiresIn: '365d' })
            return refresh_token
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = jwtService