const path = require("path")
const express = require("express")
const app = express()

const multer = require("multer")

const connectToMongoDB = require("./utils/db_connection")

/*  routes import */
const userRoutes = require("./routes/UsersRoutes")
const productsRoutes = require("./routes/ProductsRoutes")

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

/*  multer  */

// Set up the storage for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images") // Images will be stored in the 'images' directory
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		cb(null, file.fieldname + "-" + uniqueSuffix + extension)
	},
})

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5 MB limit per file
	},
})

app.post("/upload", (req, res) => {
	upload.array("images", 3)(req, res, (err) => {
		if (err instanceof multer.MulterError) {
			// A Multer error occurred when uploading.
			if (err.code === "LIMIT_FILE_SIZE") {
				return res
					.status(400)
					.json({ msg: "File size exceeds the limit (5 MB)." })
			}
			return res.status(500).json({ msg: "Internal Server Error" })
		} else if (err) {
			// An unknown error occurred.
			console.error(err)
			return res.status(500).json({ msg: "Internal Server Error" })
		}

		// Check if there are any files uploaded
		if (!req.files || req.files.length === 0) {
			return res.status(400).send("No files were uploaded.")
		}

		// Files are stored in the 'images' directory
		// Access them using req.files
		console.log(req.files)

		res.send("Images uploaded successfully!")
	})
})

app.use("/images", express.static(path.join(__dirname, "images")))

module.exports = app
