const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const definition = require("./docs/definition")

const options = {
	definition,
	// looks for configuration in specified directories
	apis: ["./router/*.js"],
}
const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app, port) {
	// Swagger Page
	app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
	// Documentation in JSON format
	app.get("/docs.json", (req, res) => {
		res.setHeader("Content-Type", "application/json")
		res.send(swaggerSpec)
	})
}

module.exports = swaggerDocs
