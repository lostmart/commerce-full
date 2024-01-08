const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Product = require("../models/ProductModel")

/**
 *
 * @param {object} // req the request object of the server
 * @param {object} / object from Multer with carrying data of the image file
 * @returns {string} a string with the url to find the image on the server
 */
const imageFormator = (req, img) => {
	const { protocol, host } = req
	console.log(url.port)
	const fileName = img.filename
	return `${protocol}://${host}/images/${fileName}`
}

/* create new product  */
exports.newProduct = async (req, res, next) => {
	// prepare data
	const productImages = req.files.map((img) => {
		return imageFormator(req, img)
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
			product: "no found",
		})
	}
}
