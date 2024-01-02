const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Product = require("../models/ProductModel")

/* create user  */
exports.newProduct = async (req, res, next) => {
	// start msg and status variables
	let msg = ""
	let statusCode = 200
	try {
		const newProduct = new Product({
			...req.body,
		})
		msg = newProduct
		statusCode = 201
	} catch (err) {
		console.log(err)
		msg = "product not created"
		statusCode = 500
	}

	res.status(statusCode).json({
		msg,
	})

	next()
}
