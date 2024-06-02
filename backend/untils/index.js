const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const parseJwt = (token) => {
    try {
        let userToken
        jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
            if (err) {
                throw { "messages": "Can't read token" }
            }
            userToken = user
        })
        return userToken
    } catch (e) {
        console.log(e)
    }
}

module.exports = { parseJwt }