const jwt = require("jsonwebtoken")
const User = require("../models/UserModel")

module.exports = async (req, res, next) => {
	const authorization = req.headers.authorization
	/* check for token  */
	if (!authorization) {
		res.status(403).json({
			msg: "something is missing here ... You're not allowed to continue",
		})
		return
	}
	try {
		const token = req.headers.authorization.split(" ")[1]
		const decodedToken = jwt.verify(token, process.env.JWT_PHRASE)
		// // console.log(decodedToken._id)
		const foundUser = await User.findOne({
			_id: decodedToken._id,
		})
		if (!foundUser) {
			throw new Error("Identifying error. Wrong token?")
		}

		next()
	} catch (err) {
		console.log(err)
		res.status(403).json({
			msg: "Auth dennied",
		})
	}
}
