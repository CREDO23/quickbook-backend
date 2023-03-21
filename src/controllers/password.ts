import User from "../models/User";
import { Request, Response, NextFunction } from "express";
import { signResetPasswordToken } from "../helpers/password";
import sendResetPasswordMail from "../helpers/nodemailer/forgotPassword";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as error from 'http-errors'
import sendResetPasswordEmail from "../helpers/nodemailer/resetPassword";

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

      const emailSent = await sendResetPasswordMail(user, link, "Forgot Password");

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

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { password } = req.body;

    const hash = bcrypt.hashSync(password, 10);

    const { token } = req.params;

    const decode = jwt.verify(token, process.env.SECRET_KEY_PASSWORD_TOKEN) as jwt.JwtPayload;

    if (decode) {
      const user = await User.findByPk(decode.id);

      if(user){
        user.update({
          ...user,
          password: hash,
        });

        const link = `${process.env.FRONTEND_URL}/login`;

        const emailSent =  await sendResetPasswordEmail(user , link , 'Password update')

        if (emailSent){
          res.json(<IClientResponse>{
            message: "Password updated successfully",
            data: user,
            error: null,
            success: true,
          });
        }
      }else{
        throw new error.NotImplemented('Could not reset the password , try again later')
      }
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      error.message = "Link expired";
    }
    next(error);
  }
};
