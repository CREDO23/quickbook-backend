import { DataTypes } from "sequelize";
import * as request from "supertest";
import app from "../src";

jest.setTimeout(60000);

const user = {
  username: "username",
  password: "password",
  email: "email@gmail.com",
  phoneNumber: "12345678",
};

let id: typeof DataTypes.UUID;
let token;

describe("REGISTER", () => {
  test("Should create an account and return an accessToken to the user", async () => {
    const response = await request(app.server).post("/api/auth/register").send(user);

    id = response.body.data.user.id;
    token = response.body.data.accessToken;

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

describe("USER", () => {
  describe("Update", () => {
    test("Should update the user", async () => {
      const response = await request(app.server)
        .put(`/api/users/update/${id}`)
        .send({
          phoneNumber: "0895023040",
        })
        .auth(`${token}`, { type: "bearer" });

      expect(response.body.message).toBe("User updated successfully");
    });
  });

  describe("Get", () => {
    test("Should get the user", async () => {
      const response = await request(app.server)
        .get(`/api/users/${id}`)
        .auth(`${token}`, { type: "bearer" });

      expect(response.body.message).toBe("User found");
      expect(response.body.data).toBeDefined();
    });
  });

  describe("Delete", () => {
    test("Should delete the user", async () => {
      const response = await request(app.server)
        .delete(`/api/users/delete/${id}`)
        .auth(`${token}`, { type: "bearer" });

      expect(response.body.message).toBe("User deleted successfully");
    });
  });
});
