const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const jwtService = {
    gennerateAccessToken: async (payload) => {
        try {
            const access_token = jwt.sign({
                payload
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            return access_token
        } catch (e) {
            console.log(e);
        }
    },
    gennerateRefreshToken: async (payload) => {
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