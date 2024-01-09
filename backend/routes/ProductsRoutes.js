const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")

const authMiddleware = require("../middleware/auth")

const upload = require("../middleware/multer")

// const multer = require("multer")

/* get all products  */
router.get("/", /* authMiddleware, */ productController.getAllProducts)
/*  get products by tags */
router.get("/:tagName", authMiddleware, productController.getProductsByTag)

/*  get one product by id */
router.get(
	"/id/:productId",
	/* authMiddleware, */
	productController.getOneProductById
)

/*  create a product  authMiddleware, */
router.post("/", upload, productController.newProduct)

/*  */
router.delete("/id/:productId", productController.deleteById)

module.exports = router
