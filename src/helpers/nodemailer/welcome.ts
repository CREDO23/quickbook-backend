import transporter from "../../configs/nodemailer";
import * as nodemailer from "nodemailer";
import User from "../../models/User";
import type { TemplateOptions } from "nodemailer-express-handlebars";

const sendWelcomeMail = (receiver: User, subject: string): Promise<string | boolean> => {
  return new Promise<string | boolean>((resolve, reject) => {
    const options: nodemailer.SendMailOptions & TemplateOptions = {
      from: process.env.NODEMAILER_EMAIL,
      subject,
      to: receiver.email,
      template: "welcome",
      context: {
        receiver: receiver.username,
        company: "Goma Digital Academy",
      },
    };

    transporter.sendMail(options, (error) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(true);
      }
    });
  });
};

export default sendWelcomeMail;
