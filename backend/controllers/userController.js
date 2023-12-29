const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/UserModel")

exports.signup = async (req, res, next) => {
	const data = req.body
	const newUser = await new User({
		...data
	})
	
	console.log(newUser)

	res.json({
		msg: "this is the post stuff ...",
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
