import { loginValidation, registerValidation } from "../validations/user";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import * as bcrypt from "bcrypt";
import { signAccessToken } from "../helpers/jwt";
import * as error from "http-errors";
import { Op } from "sequelize";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result: User = await registerValidation.validateAsync(req.body);

    if (result) {
      const isExist = User.findOne({
        where: {
          [Op.or]: [
            {
              email: result.email,
            },
            {
              username: result.username,
            },
          ],
        },
      });

      if (isExist) {
        throw error.Conflict("User already exists");
      } else {
        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(result.password, salt);

        const newUser = User.build({ ...result, password: hash });

        const savedUser = await newUser.save();

        const accessToken = await signAccessToken({
          username: savedUser.username,
          id: savedUser.id,
        });

        if (savedUser) {
          res.json(<IClientResponse>{
            message: "Account created successfully",
            data: {
              user: savedUser,
              accessToken,
            },
            error: null,
            success: true,
          });
        }
      }
    }
  } catch (error) {
    if (error.isJoi) error.status = 422;
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result: User = await loginValidation.validateAsync(req.body);

    if (result) {
      const user = await User.findOne({ where: { email: result.email } });

      if (user) {
        const isMatch = await bcrypt.compare(result.password, user.password);

        if (isMatch) {
          const accessToken = await signAccessToken({ username: user.username, id: user.id });

          res.json(<IClientResponse>{
            message: `Logged in as ${result.email}`,
            data: {
              user,
              accessToken,
            },
            error: null,
            success: true,
          });
        } else {
          throw error.NotFound("Incorect Email or password");
        }
      } else {
        throw error.NotFound("Incorect Email or password");
      }
    }
  } catch (error) {
    next(error);
  }
};
