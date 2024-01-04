//Récupère le package multer qui permet de gerer des fichiers entrants
const multer = require("multer")

//
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png",
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "images")
		console.log(req.files)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + "-" + uniqueSuffix)
	},
})



//exporte l'élément
// module.exports = multer({ storage: storage }).single("image")
module.exports = multer({ storage: storage }).array("file", 3)
