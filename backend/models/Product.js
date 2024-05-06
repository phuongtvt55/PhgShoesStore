const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        images: { type: Array, required: flase },
        sizes: [
            {
                size: { type: Number, required: true },
                countInStock: { type: Number, required: true },
            }
        ],
        type: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)