import User from "../models/User";
import * as error from "http-errors";
import { userUpdateValidation } from "../validations/user";
import { Request, Response, NextFunction } from "express";
import isValidUUID from "../helpers/uuid";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (isValidUUID(id)) {
      const result: User = await userUpdateValidation.validateAsync(req.body);

      if (result) {
        const user = await User.findOne({ where: { id } });

        if (user) {
          user.update({
            ...result,
          });

          res.json(<IClientResponse>{
            message: "User updated successfully",
            data: user,
            error: null,
            success: true,
          });
        } else {
          throw error.NotFound("User not found");
        }
      }
    } else {
      throw error.NotAcceptable("Invalid ID");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (isValidUUID(id)) {
      const user = await User.destroy({ where: { id } });

      if (user) {
        res.json(<IClientResponse>{
          message: "User deleted successfully",
          data: user,
          error: null,
          success: true,
        });
      } else {
        throw error.NotFound("User not found");
      }
    } else {
      throw error.NotAcceptable("Invalid ID");
    }
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (isValidUUID(id)) {
      const user = await User.findOne({ where: { id } });

      if (user) {
        res.json(<IClientResponse>{
          message: "User found",
          data: user,
          error: null,
          success: true,
        });
      } else {
        throw error.NotFound("User not found");
      }
    } else {
      throw error.NotAcceptable("Invalid ID");
    }
  } catch (error) {
    next(error);
  }
};
