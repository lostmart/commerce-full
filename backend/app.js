const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()
app.use(express.json())

/*  CORS  */
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	next()
})

/* DB */
//   JzD0oEXI7A1EwfCz

mongoose
	.connect(process.env.DB_CONNEXION)
	.then(() => {
		console.log("Successfully connected to MongoDB Atlas!")
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB Atlas!")
		console.error(error)
	})

app.get("/api/dame", (req, res, next) => {
	const items = [
		{
			_id: 1,
			name: "uno",
			lastName: "personas",
		},
		{
			_id: 2,
			name: "dos",
			lastName: "dos personas",
		},
	]
	res.status(200).json({
		data: items,
	})
	next()
})

app.post("/api/dame", (req, res, next) => {
	console.log(req.body)
	res.status(201).json({
		message: "Thing created successfully!",
		data: req.body,
	})
	next()
})

app.get((req, res) => {
	res.json({ message: "Your request was successful!" })
})

module.exports = app
