const express = require("express")
const router = express.Router()



const productController = require("../controllers/productController")

const authMiddleware = require("../middleware/auth")

const upload = require("../middleware/multer")

// const multer = require("multer")

/* get all products  */
router.get("/", authMiddleware, productController.getAllProducts)
/*  get products by tags */
router.get("/:tagName", authMiddleware, productController.getProductsByTag)

/*  get one product by id */
router.get(
	"/id/:productId",
	authMiddleware,
	productController.getOneProductById
)

/*  create a product */
router.post(
	"/",
	authMiddleware,
	upload,
	productController.newProduct
)

// Set up the storage for multer
// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, "images") // Images will be stored in the 'images' directory
// 	},
// 	filename: (req, file, cb) => {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
// 		const extension = path.extname(file.originalname)
// 		cb(null, file.fieldname + "-" + uniqueSuffix + extension)
// 	},
// })

// const upload = multer({ storage: storage })

// Endpoint to handle file uploads
// router.post("/upload", upload.array("images", 3), (req, res) => {
// 	// Files are stored in the 'images' directory
// 	// Access them using req.files
// 	console.log(req.files)

// 	res.send("Images uploaded successfully!")
// })

module.exports = router
