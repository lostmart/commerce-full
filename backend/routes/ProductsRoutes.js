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

/* delete a product by Id  */
router.delete("/id/:productId", productController.deleteById)

/*  update a product based on its Id  */
router.put("/id/:productId", upload, productController.updateProduct)

module.exports = router
