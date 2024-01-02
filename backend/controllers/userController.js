const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/UserModel")
const { Error } = require("mongoose")

/* create user  */
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
		if (savedUser) {
			msg = "User created successfully!!"
			statusCode = 201
		} else {
			statusCode = 500
			throw new Error("Error creting the user ...")
		}
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

/*  login: find a suer on DB */
exports.login = async (req, res, next) => {
	// start msg and status variables
	let msg = ""
	let statusCode = 200

	const data = req.body
	const foundUser = await User.findOne({
		email: data.email,
	})

	/* try to find user based on its emal  */
	if (!foundUser) {
		msg = "No user found with this email ..."
		statusCode = 403
	} else {
		/*  comparar passwords (user db pass vs user sent pass) */
		const matchingPass = await bcrypt.compare(data.password, foundUser.password)
		if (!matchingPass) {
			msg = "Wrong email or password"
			statusCode = 403
		} else {
			/* send token with user id and expire date  */
			try {
				msg = jwt.sign({ _id: foundUser._id }, "my_secret", {
					expiresIn: "24h",
				})
			} catch (err) {
				msg = err
				statusCode = 500
			}
		}
	}

	res.status(statusCode).json({ msg })
	next()
}
