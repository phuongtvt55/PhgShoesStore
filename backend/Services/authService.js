const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtService = require("./jwtService");
const dotenv = require("dotenv")
dotenv.config()

const authService = {
    register: async (newUser) => {
        try {
            const { name, email, password } = newUser;
            const checkEmail = await User.findOne({ email });
            if (checkEmail) throw { messages: "Email already exists!!!" };
            const hashPass = await bcrypt.hash(password, 10);
            const createUser = await User.create({ name, email, password: hashPass });
            return { status: "OK", messages: "Register successfully!", data: createUser };
        } catch (e) {
            throw e;
        }
    },

    login: async (newUser) => {
        try {
            const user = await User.findOne({ email: newUser.email });
            if (!user) throw ("Email is not registered!!!");
            const validPass = await bcrypt.compare(newUser.password, user.password);
            if (!validPass) throw ("Password is incorrect!!!");
            const { id, name, email, isAdmin } = user;
            const access_token = await jwtService.generateAccessToken({ id, name, email, isAdmin });
            const refresh_token = await jwtService.generateRefreshToken({ id, name, email, isAdmin });
            return { status: "OK", messages: "Login successfully", access_token, refresh_token };
        } catch (e) {
            throw { messages: e };
        }
    },
    refreshToken: async (token) => {
        try {
            let userToken
            jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
                if (err) {
                    throw { "messages": "Can't read token" }
                }
                userToken = user
            })
            const { id, name, email, isAdmin } = userToken.payload;
            const access_token = await jwtService.generateAccessToken({ id, name, email, isAdmin });
            //const refresh_token = await jwtService.generateRefreshToken({ id, name, email, isAdmin });
            return { status: "OK", messages: "Refresh successfully", access_token, refresh_token };
        } catch (e) {
            throw { messages: "An error occurred" }
        }
    }
}
module.exports = authService;
