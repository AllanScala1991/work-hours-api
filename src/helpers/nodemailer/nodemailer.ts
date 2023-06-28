import { Mail, Mailer } from "../../models/Mailer";
import nodemailer from "nodemailer";
const mailgunTransport = require('nodemailer-mailgun-transport');
import "dotenv/config";

interface Transporter {
    auth: {
        api_key: string
        domain: string
    }
}

export class NodeMailer implements Mailer {
    createTransporter(transp: Transporter){
        const mailgun = mailgunTransport({
            auth: {
                api_key: transp.auth.api_key,
                domain: transp.auth.domain
            }
        })

        return nodemailer.createTransport(mailgun);
    }

    async sendMail(mail: Mail): Promise<string> {
        const transporter = this.createTransporter({
            auth: {
                api_key: process.env.MAIL_API_KEY,
                domain: process.env.MAIL_DOMAIN
            }
        })

        const data = await transporter.sendMail({
            from: mail.from,
            to: mail.to,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        })

        return `Message sent with id: ${data.messageId}`
    }
    
}