const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const fs = require("fs")

const Product = require("../models/ProductModel")
const { log } = require("console")

/* create new product  */
exports.newProduct = async (req, res, next) => {
	// prepare data
	const productImages = req.files.map((img) => {
		return `${req.protocol}://${req.get("host")}/images/${img.filename}`
	})
	// console.log(req.get("host"))
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
	if (products.length < 1) {
		return res.status(404).json({
			products,
			msg: "No products found"
		})
	}
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
		/* nothing found */
		if (!foundProduct) {
			return res.status(404).json({
				product: foundProduct,
			})
		}
		res.status(200).json({
			product: foundProduct,
		})
	} catch (err) {
		res.status(500).json({
			product: err,
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

		tryProduct.productImages.forEach((img) => {
			// delete images
			const filename = img.split("/images/")[1]
			fs.unlink("images/" + filename, () => {
				console.log(`image ${filename} deleted`)
			})
		})

		const foundProduct = await Product.deleteOne({ _id: productId })

		if (foundProduct.acknowledged) {
			res.status(200).json({
				msg: "Product deleted",
				id: `Product id: ${productId}`,
			})
		} else {
			res.status(500).json({
				msg: "Something went terribly wrong !",
			})
		}
	} catch (err) {
		res.status(404).json({
			msg: err,
		})
	}
}

/* put/patch one product by its Id */
exports.updateProduct = async (req, res) => {
	const productId = req.params.productId
	// console.log(req.body)

	const productImages = req.files.map((img) => {
		return `${req.protocol}://${req.get("host")}/images/${img.filename}`
	})

	console.log(req.files)

	try {
		const foundProduct = await Product.updateOne(
			{ _id: productId },
			{
				$set: {
					productName: req.body.productName,
					productPrice: req.body.productPrice,
					productTags: req.body.productTags,
					productImages: productImages,
				},
			}
		)
		/*   check if it exists   */
		if (!foundProduct.acknowledged) {
			return res.status(404).json({ msg: "nothing found with this id" })
		}

		res.status(200).json({
			product: foundProduct,
		})
	} catch (err) {
		res.status(404).json({
			msg: err,
		})
	}
}
