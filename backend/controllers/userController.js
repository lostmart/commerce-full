const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/UserModel")

exports.signup = async (req, res, next) => {
	// start msg and status variables
	let msg = ""
	let statusCode = 200

	const hushedPass = await bcrypt.hash(req.body.password, 10)

	// set new usr using mongoose schema
	const newUser = await new User({
		email: req.body.email,
		userName: req.body.userName,
		password: hushedPass,
	})

	try {
		const savedUser = await newUser.save()
		msg = "User created successfully!!"
		statusCode = 201
	} catch (err) {
		// set message and error code
		console.log(err)
		msg = err.errors
		statusCode = 400
	}

	// send status code and message as json
	res.status(statusCode).json({
		msg,
	})
	next()
}

exports.login = (req, res, next) => {
	const data = req.body
	console.log(data)
	res.json({
		msg: "you are on user route !!",
	})
	next()
}
