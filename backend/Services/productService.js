const { default: mongoose } = require("mongoose")
const Product = require("../models/Product")

const productService = {
    getAll: async () => {
        try {
            const product = await Product.find()
            if (!product) {
                throw ("Can't get products")
            }
            return { product }
        } catch (e) {
            throw { messages: e }
        }
    },
    createProduct: async (data) => {
        try {
            const { name, images, sizes, type, price, rating, description } = data

            const proName = await Product.find({ name: name })
            if (proName.length !== 0) throw { messages: "Product already exist, try another one" }

            const createProduct = await Product.create({
                name, images, sizes, type, price, rating, description
            })
            return { status: "OK", messages: "Create product successfully!", data: createProduct };
        } catch (e) {
            throw { messages: e }
        }
    },
    updateProduct: async (id, data) => {
        try {
            const checkProduct = await Product.findById(id)
            if (!checkProduct) throw { messages: "Product not exsit" }

            const checkName = await Product.find({ name: data.name })
            if (checkName.length !== 0) throw { messages: "Product name is already exsit" }

            const updateProduct = await Product.findByIdAndUpdate(id, data, { new: true })
            return { status: "OK", messages: "Update product successfully!", data: updateProduct };
        } catch (e) {
            throw { messages: e }
        }
    },
    getById: async (id) => {
        try {
            const product = await Product.findById(id)
            if (!product) throw { messages: "Can't find product" }
            return product
        } catch (e) {
            throw { messages: e }
        }
    },
    deleteProduct: async (id) => {
        try {
            const prodcut = await Product.findById(id)
            if (!prodcut) throw { messages: "Can't find product" }
            const deleteProduct = await Product.findByIdAndDelete(id)
            return { messages: "Delete successfully" }
        } catch (e) {
            throw { messages: e }
        }
    },
    getDiscountProducts: async (proIds) => {
        try {
            const ids = proIds.map((id) => new mongoose.Types.ObjectId(id))
            const products = await Product.find({ _id: { $in: ids } })
            const discountedProducts = products.map(product => ({
                name: product.name,
                discountedPrice: product.price - (product.price * (product.discount / 100))
            }));

            return discountedProducts;
        } catch (e) {
            console.log(e)
            throw { messages: e }
        }
    }
}

module.exports = productService