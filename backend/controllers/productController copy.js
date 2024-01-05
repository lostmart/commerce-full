const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Product = require("../models/ProductModel")

const multer = require("multer")

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images") // Images will be stored in the 'images' directory
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		cb(null, file.fieldname + "-" + uniqueSuffix + extension)
	},
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit per file
	},
})

/* create new product  */
exports.newProduct = async (req, res, next) => {
	if (!req.files || req.files.length === 0) {
		return res.status(400).send("No files were uploaded.")
	}

	//console.log(req.files)
	// start msg and status variables
	let msg = ""
	let statusCode = 200
	try {
		const newProduct = new Product({
			...req.body,
		})
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
