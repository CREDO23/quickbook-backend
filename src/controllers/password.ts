import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { signResetPasswordToken } from "../helpers/password";
import sendResetPasswordMail from "../helpers/nodemailer/forgotPassword";
import * as dotenv from "dotenv";

dotenv.config();

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ where: { username } });

    if (user) {
      const token = await signResetPasswordToken({ username: user.username, id: user.id });

      const link = `${process.env.FRONTEND_URL}/password/forgot/${token}`;

      const emailSent = await sendResetPasswordMail(user, link, "Reset Password");

      if (emailSent) {
        res.json(<IClientResponse>{
          message: "We have sent a recovery password link to your email address , check your inbox",
          data: emailSent,
          success: true,
          error: null,
        });
      } else {
        res.json(<IClientResponse>{
          message: "We have sent a recovery password link to your email address , check your inbox",
          data: null,
          success: true,
          error: null,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};
