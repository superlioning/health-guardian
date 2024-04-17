jest.useFakeTimers();
const request = require("supertest");
const app = require("./server");

describe("GET /api/some-endpoint", () => {
  it("responds with json", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          message: "Must provide query string.",
        },
      ],
    });
  });
});
