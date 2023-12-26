const mongoose = require("mongoose")

// mongoose
// 	.connect(process.env.DB_CONNEXION)
// 	.then(() => {
// 		console.log("Successfully connected to MongoDB Atlas!")
// 	})
// 	.catch((error) => {
// 		console.log("Unable to connect to MongoDB Atlas!")
// 		console.error(error)
// 	})

async function connectToMongoDB(connectionUri) {
	try {
		const connectionString =
			process.env.DB_CONNEXION || "mongodb://localhost:27017/your-database"

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
