import transporter from "../../configs/nodemailer";
import * as nodemailer from "nodemailer";
import type { TemplateOptions } from "nodemailer-express-handlebars";
import User from "../../models/User";

const sendResetPasswordEmail = (
  receiver: User,
  link: string,
  subject: string,
): Promise<string | boolean> => {
  return new Promise<string | nodemailer.SentMessageInfo>((resolve, reject) => {
    const options: nodemailer.SendMailOptions & TemplateOptions = {
      from: process.env.NODEMAILER_EMAIL,
      subject,
      to: receiver.email,
      template: "resetPassword",
      context: {
        link,
        receiver: receiver.username,
      },
    };

    transporter.sendMail(options, (error, result) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(result);
      }
    });
  });
};

export default sendResetPasswordEmail;
