const User = require("../models/User")

const userService = {
    getAll: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const users = await User.find({ isAdmin: false })
                return resolve(users)
            } catch (e) {
                return reject({
                    "messages": e
                })
            }
        })
    },
    getById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id)
                if (!user) {
                    return reject({
                        "messages": "Not found user"
                    })
                }
                return resolve(user)
            } catch (e) {
                return reject({
                    "messages": e
                })
            }
        })
    },
    updateUser: (id, data) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(data)
                const user = await User.findByIdAndUpdate(id, data, { new: true })
                resolve({
                    "messages": "Update successfully",
                    "user": user
                })
            } catch (e) {
                return reject({
                    "messages": e
                })
            }
        })
    },
    delteUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findById(id)
                if (!user) {
                    return resolve({
                        "messages": "Could not find user"
                    })
                }
                await User.findByIdAndDelete(id)
                return resolve({
                    "messages": "Delete successfully"
                })
            } catch (e) {
                return reject({
                    "messages": e
                })
            }
        })
    }
}

module.exports = userService