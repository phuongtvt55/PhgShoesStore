const User = require("../models/User");

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
    }
};

module.exports = userService;
