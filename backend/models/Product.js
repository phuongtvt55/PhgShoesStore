const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        images: { type: Array, required: false },
        sizes: [
            {
                size: { type: Number, required: true },
                countInStock: { type: Number, required: true },
            }
        ],
        type: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        rating: { type: Number, required: true },
        description: { type: String, required: true },
        selled: { type: Number, default: 0 }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Product", productSchema)