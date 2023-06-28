export interface Mail {
    from: string
    to: string
    subject: string
    text: string
    html?: string
}

export interface Mailer {
    sendMail(mail: Mail): Promise<string>
}