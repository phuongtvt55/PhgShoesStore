const mongoose = require("mongoose")
const Order = require("../models/Order")
const Product = require("../models/Product")
const dotenv = require("dotenv")
const { parseJwt } = require("../untils")
dotenv.config()

const orderService = {
    createOrder: async (token, data) => {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const userToken = parseJwt(token)
            //const user = await User.findById(userToken.payload.id)
            data.user = userToken.payload.id
            data.isPaid = data.paymentMethod !== 'delivery'
            const order = new Order(data);
            await order.save({ session });

            //Remove product in stock and increase selled
            for (const item of data.orderItems) {
                const product = await Product.findOneAndUpdate(
                    {
                        _id: item.product,
                        sizes: { $elemMatch: { size: item.size, countInStock: { $gte: item.amount } } }
                    },
                    {
                        $inc: {
                            "sizes.$.countInStock": -item.amount,
                            selled: item.amount
                        }
                    },
                    { new: true, session }
                );

                if (!product) {
                    throw { messages: "Out of stock" }
                }
            }

            await session.commitTransaction();
            session.endSession();
            return { status: "Ok", messages: "Order successfully" }
        } catch (e) {
            console.log("Err", e)
            await session.abortTransaction();
            session.endSession();
            throw { messages: e };
        }
    },
    getUserOrder: async (token) => {
        try {
            const userToken = parseJwt(token);
            const userOrder = await Order.find({ user: userToken.payload.id }).populate("orderItems.product")
            if (!userOrder) {
                throw { messages: "Can't find order" }
            }
            //console.log(userOrder)
            return userOrder
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = orderService