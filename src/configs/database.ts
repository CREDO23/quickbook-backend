/* eslint-disable no-console */
import { Sequelize } from "sequelize";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { NODE_ENV, DEV_POSTGRES_URI, PRODUCTION_POSTGRES_URI } = process.env;

const stringConnection =
  NODE_ENV === "production"
    ? PRODUCTION_POSTGRES_URI
    : NODE_ENV === "development"
    ? DEV_POSTGRES_URI
    : "";

const sequelize = new Sequelize(stringConnection as string, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
});

const connectDatabase = () => {
  try {
    //test the connection by trying to authentificate
    sequelize.authenticate();
    console.log("Successfully connected to database");
  } catch (error) {
    console.log("Unable to connect to database ", error);
  }
};

export default connectDatabase;
