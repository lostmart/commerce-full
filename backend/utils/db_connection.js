const mongoose = require("mongoose")

async function connectToMongoDB() {
	try {
		const connectionString = process.env.DB_LOCAL

		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
		})

		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message)
		throw error
	}
}

module.exports = connectToMongoDB
