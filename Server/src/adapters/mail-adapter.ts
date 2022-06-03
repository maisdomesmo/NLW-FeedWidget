export interface SendMailData {
    subject: string,
    body: string
}

export interface Mailadapter {
    sendMail: (data: SendMailData) => Promise<void>;
}