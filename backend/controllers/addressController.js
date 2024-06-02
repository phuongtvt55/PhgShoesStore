const addressService = require("../Services/addressService")

const addressController = {
    createAddress: async (req, res) => {
        try {
            const response = await addressService.createAddress(req.body)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    getAll: async (req, res) => {
        try {
            const response = await addressService.getAll(req.headers.token.split(" ")[1])
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    deleteAddres: async (req, res) => {
        try {
            const response = await addressService.deleteAddress(req.headers.token.split(" ")[1], req.params)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    setAsDefault: async (req, res) => {
        try {
            const response = await addressService.setAsDefault(req.headers.token.split(" ")[1], req.params)
            return res.status(200).json(response)
        } catch (err) {
            return res.status(500).json(err)
        }
    }
}

module.exports = addressController