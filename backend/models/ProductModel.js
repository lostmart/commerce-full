const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
	productName: { type: String, required: true },
	productPrice: { type: Number, required: true },
	productTags: { type: Array, required: true },
	productImages: { type: Array},
})

module.exports = mongoose.model("Product", productSchema)
