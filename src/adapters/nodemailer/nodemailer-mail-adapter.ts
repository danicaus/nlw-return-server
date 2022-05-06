import { MailAdapter, SendEmailData } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c6fdef8b7ef5b3",
    pass: "38b4ed8faee6e4"
  }
});

export class NodeMailerAdapter implements MailAdapter {
  async sendMail({subject, body}: SendEmailData) {
    await transport.sendMail({
      from: 'Dani Caus <ola@feedget.com>',
      to: 'Dani Caus <email@email.com>',
      subject,
      html: body
    })
  }
}
