const request = require("supertest")
const app = require("../app")

describe("POST /api/userslogin/login", () => {
	describe("given a username and password", () => {
		test("shoud respond with 201 status code", async () => {
			const response = await request(app)
				.post("/api/userslogin/login")
				.expect(201)
		})
	})
})
