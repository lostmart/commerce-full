//Récupère le package multer qui permet de gerer des fichiers entrants
const { log } = require("console")
const multer = require("multer")

const path = require("path")

// Set up the storage for multer
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images")
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		const imagePath = file.fieldname + "-" + uniqueSuffix + extension
		cb(null, imagePath)
	},
})

function checkFileType(file, cb) {
	const filetypes = /webp|jpg|jpeg|png/ // Choose Types you want...
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)
	// console.log(extname, mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb("Jpg, Jpeg, Png, webp images only!") // custom this message to fit your needs
	}
	// return cb(null, true)
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024, // 1 MB limit per file
	},
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
})

module.exports = upload.array("product_img", 3)
