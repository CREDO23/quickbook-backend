import transporter from "../../configs/nodemailer";
import * as ejs from "ejs";
import * as nodemailer from "nodemailer";
import User from "../../models/User";

const sendWelcomeMail = (receiver: User, subject: string): Promise<string | boolean> => {
  return new Promise<string | boolean>((resolve, reject) => {
    ejs.renderFile(
      __dirname + "/templates/welcome.ejs",
      { receiver: receiver.username },
      (error, data) => {
        if (error) {
          reject(error.message);
        } else {
          const options: nodemailer.SendMailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            subject,
            html: data,
            to: receiver.email,
            attachments: [
              {
                filename: "logo.png",
                path: process.cwd() + "/assets/icons/logo.png",
                cid: "logo",
              },
            ],
          };

          transporter.sendMail(options, (error) => {
            if (error) {
              reject(error.message);
            } else {
              resolve(true);
            }
          });
        }
      },
    );
  });
};

export default sendWelcomeMail;
