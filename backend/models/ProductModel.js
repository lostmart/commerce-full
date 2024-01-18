const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
	productName: { type: String, required: true },
	productDescription: { type: String, required: true },
	productPrice: { type: Number, required: true },
	productTags: { type: Array, required: true },
	productImages: { type: Array },
	productStatus: { type: Boolean },
})

module.exports = mongoose.model("Product", productSchema)
