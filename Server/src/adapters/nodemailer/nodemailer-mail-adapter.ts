import { Mailadapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "69f2e6dc64012c",
      pass: "bd1388c67fd47f"
    }
  });

export class NodemailerMailAdapter implements Mailadapter {
    async sendMail({subject, body}: SendMailData){
        await transport.sendMail({
            from: 'Equipe feedget  <oi@feedet.com',
            to: 'João pedro <jupiramanteiga@gmail.com>',
            subject,
            html: body,
    })
    }
}