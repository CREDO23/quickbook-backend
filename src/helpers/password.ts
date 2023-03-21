import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import { DataTypes } from "sequelize";

dotenv.config();

interface ICredentials {
  username: string;
  id: typeof DataTypes.UUID;
}

export const signResetPasswordToken = ({ username, id }: ICredentials): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(
      { username, id },
      process.env.SECRET_KEY_PASSWORD_TOKEN as string,
      {
        expiresIn: 60 * 5,
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
