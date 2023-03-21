import * as nodemailer from "nodemailer";
import * as hb from "nodemailer-express-handlebars";
import hbOptions from "../helpers/nodemailer/hbOptions";

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

transporter.use("compile", hb(hbOptions));

export default transporter;
