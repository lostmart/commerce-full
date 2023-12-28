const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res, next) => {
	res.json({
		msg: "this is the post stuff ...",
	})
	next()
}

exports.login = (req, res, next) => {
	res.json({
		msg: "you are on user route !!",
	})
	next()
}
