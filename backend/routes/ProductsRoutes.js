const express = require("express")
const router = express.Router()

const productController = require("../controllers/productController")

const authMiddleware = require("../middleware/auth")

router.get("/", authMiddleware, (req, res) => {
	res.status(200).json({
		msg: "secret products route ...",
	})
})

router.post("/", authMiddleware, productController.newProduct)

module.exports = router
