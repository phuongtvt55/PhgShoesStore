const User = require("../models/User");
const { parseJwt } = require("../untils")

const userService = {
    getAll: async () => {
        try {
            return await User.find({ isAdmin: false });
        } catch (e) {
            throw { messages: e };
        }
    },
    getById: async (id) => {
        try {
            const user = await User.findById(id);
            if (!user) throw { messages: "Not found user" };

            return user;
        } catch (e) {
            throw { messages: e };
        }
    },
    updateUser: async (id, data) => {
        try {
            const user = await User.findByIdAndUpdate(id, data, { new: true });
            return { messages: "Update successfully", user };
        } catch (e) {
            throw { messages: e };
        }
    },
    delteUser: async (id) => {
        try {
            const user = await User.findById(id);
            if (!user) throw { messages: "Could not find user" };
            await User.findByIdAndDelete(id);
            return { messages: "Delete successfully" };
        } catch (e) {
            throw { messages: e };
        }
    },
    getWishList: async (token) =>{
        try{
            const userToken = parseJwt(token)
            const user = await User.findById(userToken.payload.id)
            if(!user) throw {messages: "Not found user"}
            return user.wishList
        }catch(e){
            throw {messages: e}
        }
    },
    addWishList: async (token, id) => {
        try {
            const userToken = parseJwt(token)
            const user = await User.findById(userToken.payload.id)
            if (!user) {
                throw { messages: "Not found user" }
            }
            user.wishList = [id, ...user.wishList]
            const update = await User.findByIdAndUpdate(userToken.payload.id, user, { new: true })
            return { statsus: "Ok", messages: "Add wishList successfully", update: update }
        } catch (e) {
            console.log(e)
            throw { messages: e }
        }
    },
    removeWishList: async (token, id) => {
        try {
            const userToken = parseJwt(token)
            const user = await User.findById(userToken.payload.id)
            if (!user) {
                throw { messages: "Not found user" }
            }
            const update = await User.updateOne({ email: userToken.payload.email }, { $pull: { wishList: id } }, { new: true })
            return { statsus: "Ok", messages: "Remove wishList successfully", update: update }
        } catch (e) {
            throw { messages: e }
        }
    }
};

module.exports = userService;
