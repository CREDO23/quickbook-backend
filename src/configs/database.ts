/* eslint-disable no-console */
import { Sequelize } from "sequelize";
import * as pg from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, DEV_POSTGRES_URI, PRODUCTION_POSTGRES_URI, TEST_POSTGRES_URI } = process.env;

const stringConnection =
  NODE_ENV === "production"
    ? PRODUCTION_POSTGRES_URI
    : NODE_ENV === "developement"
    ? DEV_POSTGRES_URI
    : NODE_ENV === "test"
    ? TEST_POSTGRES_URI
    : "";

export const sequelize = new Sequelize(stringConnection as string, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});

export const connectDatabase = () => {
  try {
    //test the connection by trying to authentificate
    sequelize.authenticate();

    //synchronize all models
    sequelize.sync({ alter: false });

    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Unable to connect to database ", error);
  }
};

export default sequelize;
