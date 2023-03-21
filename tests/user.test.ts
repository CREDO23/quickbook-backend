import { DataTypes } from "sequelize";
import * as request from "supertest";
import App from "../src/app";

jest.setTimeout(60000);

const user = {
  username: "username123",
  password: "password",
  email: "bakerathierry@gmail.com",
};

const app = new App();
let id: typeof DataTypes.UUID;
let token;

beforeAll(() => {
  app.init();
});

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

  describe("Get", () => {
    test("Should not be able to get a deleted user", async () => {
      const response = await request(app.server)
        .get(`/api/users/${id}`)
        .auth(`${token}`, { type: "bearer" });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});

describe('PASSWORD' ,  () => {
  describe('Forgot Password',  () => {
    test("It should send an email to the user if the user is found in the database", async () => {
        const response = await request(app.server).post('/api/password/forgot').send({username: user.username})

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("We have sent a recovery password link to your email address , check your inbox");
        expect(response.body.data).toBeDefined()
        expect(response.body.data.accepted).toEqual(['bakerathierry@gmail.com'])
    })
  })
})
