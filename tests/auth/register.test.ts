import * as request from "supertest";
import app from "../../src";

jest.setTimeout(60000);

describe("REGISTRATION", () => {
  test("Should create an account and return an accessToken to the user", async () => {
    const response = await request(app.server).post("/api/auth/register").send({
      username: "CREfdDO23",
      password: "credo23",
      email: "bakerathiedfrry@gmail.com",
      phoneNumber: "0970721888",
    });

    expect(response.body.message).toBe("Account created successfully");
  });
});
