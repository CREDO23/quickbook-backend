import * as request from "supertest";
import app from "../../src";

jest.setTimeout(60000);

const user = {
  username: "username",
  password: "password",
  email: "email@gmail.com",
  phoneNumber: "12345678",
};

describe("REGISTER", () => {
  test("Should create an account and return an accessToken to the user", async () => {
    const response = await request(app.server).post("/api/auth/register").send(user);

    expect(response.body.message).toBe("Account created successfully");
    expect(response.body.data.accessToken).toBeDefined();
  });
});

describe("LOGIN", () => {
  test("Should log in his account and return an accessToken", async () => {
    const response = await request(app.server).post("/api/auth/login").send({
      password: user.password,
      email: user.email,
    });

    expect(response.body.message).toBe(`Logged in as ${user.email}`);
    expect(response.body.data.accessToken).toBeDefined();
  });
});
