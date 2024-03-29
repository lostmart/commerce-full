const path = require("path")
const express = require("express")
const app = express()

  
const connectToMongoDB = require("./utils/db_connection")

/*  routes import */
const userRoutes = require("./routes/UsersRoutes")
const productsRoutes = require("./routes/ProductsRoutes")

app.use(express.json())
app.disable("x-powered-by") 


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

/* DB connection */
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
		msg: "Welcome to the consumers API",
	})
})

app.use("/api/users", userRoutes)
app.use("/api/products", productsRoutes)

/* static folder */
app.use("/images", express.static(path.join(__dirname, "images")))

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
