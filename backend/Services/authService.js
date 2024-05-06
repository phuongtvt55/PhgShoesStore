const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwtService = require("./jwtService")

const register = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser

        try {
            const checkEmail = await User.findOne({ email: email })
            if (checkEmail !== null) {
                return reject({
                    messages: "Email already exist!!!"
                })

            }
            const salt = await bcrypt.genSalt(10)
            const hashPass = await bcrypt.hash(password, salt)
            const createUser = await User.create({
                name, email, password: hashPass
            })
            if (createUser) {
                return resolve({
                    status: "OK",
                    messages: "Register successfully!",
                    data: createUser
                })
            }
        } catch (e) {
            return reject(e)
        }
    })
}

const login = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ email: newUser.email })
            if (!user) {
                return reject({
                    messages: "Email is not register!!!"
                })
            }
            const validPass = await bcrypt.compare(newUser.password, user.password)
            if (!validPass) {
                return reject({
                    messages: "Password is incorrect!!!"
                })
            }

            const access_token = await jwtService.gennerateAccessToken({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })

            const refresh_token = await jwtService.gennerateRefreshToken({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })


            return resolve({
                "status": "OK",
                "messages": "Login successfully",
                "access_token": access_token,
                "refresh_token": refresh_token
            })
        } catch (e) {
            return reject({
                "messages": e
            })
        }
    })
}

module.exports = {
    register,
    login
}