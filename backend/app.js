const mongoose = require("mongoose")
const express = require("express")
const app = express()

const connectToMongoDB = require("./utils/db_connection")

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

async function startApp() {
	try {
		await connectToMongoDB()
	} catch (error) {
		console.error("Failed to start the application:", error.message)
		process.exit(1)
	}
}

startApp()

app.get("/", (req, res) => {
	res.json({
		msg: "todo ok",
	})
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
