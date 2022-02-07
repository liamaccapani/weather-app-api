import request from "supertest";
import citiesRouter from "../src/services/cities/routes.js";

describe("GET /cities", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(citiesRouter).get("/")
    expect(response.statusCode).toBe(200);
  });
});