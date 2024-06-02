const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    addressItems: [
        {
            name: { type: String, required: true },
            phone: { type: Number, required: true },
            localAddress: { type: String, required: true },
            specificAddress: { type: String, required: true },
            default: { type: Boolean, default: false },
        }
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }
)

module.exports = mongoose.model("Address", addressSchema)