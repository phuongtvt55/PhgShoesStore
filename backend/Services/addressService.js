const Address = require("../models/Address")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const { parseJwt } = require("../untils")
dotenv.config()

const addressService = {
    createAddress: async (data) => {
        try {
            const userAddress = await Address.findOne({ user: new mongoose.Types.ObjectId(data.user) })
            //If user don't have any address
            if (!userAddress) {
                const userId = data.user
                data.user = new mongoose.Types.ObjectId(userId)
                data.addressItems[0].default = true;
                const createAddress = await Address.create(data)
                return { status: "OK", messages: "Create successfully!", data: createAddress };
            }

            //when user already have address
            if (data.addressItems[0].default) {
                userAddress.addressItems.forEach((item) => item.default = false)
            }
            userAddress.addressItems = [data.addressItems[0], ...userAddress.addressItems]
            const createAddress = await Address.create(userAddress)
            return { status: "OK", messages: "Create successfully!", data: createAddress };
        } catch (e) {
            console.log(e)
            throw e
        }
    },
    getAll: async (token) => {
        try {
            const userToken = parseJwt(token)
            const address = await Address.findOne({ user: new mongoose.Types.ObjectId(userToken.payload.id) })
            return address
        } catch (e) {
            throw e
        }
    },
    deleteAddress: async (token, addressId) => {
        try {
            const userToken = parseJwt(token)
            const deleteAddress = await Address.updateOne({ user: new mongoose.Types.ObjectId(userToken.payload.id) },
                { $pull: { addressItems: { _id: new mongoose.Types.ObjectId(addressId) } } })
            return { status: "OK", messages: "delete successfully", delete: deleteAddress }
        } catch (e) {
            throw e
        }
    },
    setAsDefault: async (token, addressId) => {
        try {
            const userToken = parseJwt(token)
            const address = await Address.findOne({ user: new mongoose.Types.ObjectId(userToken.payload.id) })

            const objectIdAddressId = new mongoose.Types.ObjectId(addressId);
            address.addressItems.forEach((item) => {
                if (item._id.equals(objectIdAddressId)) {
                    item.default = true
                } else {
                    item.default = false
                }
            })
            const setDefault = await Address.updateOne(address)
            return { status: "OK", messages: "Create successfully!", data: setDefault };
        } catch (e) {
            //console.log(e)
            throw e
        }
    }
}

module.exports = addressService