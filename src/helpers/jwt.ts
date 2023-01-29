import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { DataTypes } from "sequelize";

dotenv.config();

interface ICredentials {
  username: string;
  id: typeof DataTypes.UUID;
}

export const signAccessToken = ({ username, id }: ICredentials): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { username, id },
      process.env.SECRET_KEY_ACCESS_TOKEN as string,
      {
        expiresIn: "7 day",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result as string);
      },
    );
  });
};
