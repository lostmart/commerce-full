const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")


router.get("/", (req, res, next) => {
    console.log("done !");
    res.json({
        msg: "you are on user route !!",
	})
})

router.post("/signup", userController.signup)

module.exports = router
