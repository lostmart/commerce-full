const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Product = require("../models/ProductModel")

/* create new product  */
exports.newProduct = async (req, res, next) => {
	// prepare data
	const productImages = req.files.map((img) => {
		return `${req.protocol}://${req.headers.host}/images/${img.filename}`
	})
	//console.log(productImages)
	// start msg and status variables
	let msg = ""
	let statusCode = 200
	try {
		const newProduct = new Product({
			...req.body,
		})

		newProduct.productImages = productImages
		const savedProduct = await newProduct.save()

		msg = savedProduct
		statusCode = 201
	} catch (err) {
		console.log(err)
		msg = err
		statusCode = 500
	}

	res.status(statusCode).json({
		msg,
	})

	next()
}

/* get a list aof all the products  */
exports.getAllProducts = async (req, res, next) => {
	const products = await Product.find()
	res.status(200).json({
		products,
	})
}

/* get a list of all the products based on the tags passed as a param  */
exports.getProductsByTag = async (req, res, next) => {
	const selectedTag = req.params.tagName
	try {
		const products = await Product.find({ productTags: selectedTag })
		if (products.length === 0) {
			throw new Error("no products found with that tag")
		}
		res.status(200).json({
			products,
		})
	} catch (err) {
		console.log(err)
		res.status(404).json({
			products: "nothing",
		})
	}
}

/* get one product by id as param  */
exports.getOneProductById = async (req, res) => {
	const productId = req.params.productId

	try {
		const foundProduct = await Product.findOne({ _id: productId })
		res.status(200).json({
			product: foundProduct,
		})
	} catch (err) {
		res.status(404).json({
			product: "nothing found",
		})
	}
}

/* delete one product by Id */
exports.deleteById = async (req, res) => {
	const productId = req.params.productId

	try {
		const tryProduct = await Product.findOne({ _id: productId })

		if (!tryProduct) {
			return res.status(404).json({ msg: "nothing found with this id" })
		}

		const foundProduct = await Product.deleteOne({ _id: productId })

		res.status(200).json({
			msg: "Product deleted",
			id: `Product id: ${productId}`,
		})
	} catch (err) {
		res.status(404).json({
			msg: err,
		})
	}
}
