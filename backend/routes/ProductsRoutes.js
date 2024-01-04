const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")

const authMiddleware = require("../middleware/auth")

const multer = require("../middleware/multer")

/* get all products  */
router.get("/", authMiddleware, productController.getAllProducts)
/*  get products by tags */
router.get("/:tagName", authMiddleware, productController.getProductsByTag)

/*  get one product by id */
router.get("/id/:productId", authMiddleware, productController.getOneProductById)

/*  create a product */
router.post("/", authMiddleware, multer, productController.newProduct)

module.exports = router
