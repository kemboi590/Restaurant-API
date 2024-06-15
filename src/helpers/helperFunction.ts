import nodemailer from 'nodemailer';

export const sendEmail = async (email: string, subject: string, userName: string, message: string) => {
    // https://nodemailer.com/usage/using-gmail/
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `${subject}`,
            text: message,
            html: `<b>${message}</b>`
        };

        const mailRes = await transporter.sendMail(mailOptions);
        console.log('mailRes', mailRes);

        let mailResponse:string = '';
        if (mailRes.accepted.length > 0) {
            mailResponse = 'Email sent successfully';
        } else if (mailRes.rejected.length > 0) {
            mailResponse = 'Email not sent';
        } else {
            mailResponse = 'Email server error sent';
        }
        return mailResponse;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }
};

export interface EmailOptions {
    from: string;
    to: string;
    email: string;
    subject: string;
    text: string;
    html: string;
}

export interface MailResponse {
    accepted: string[];
    rejected: string[];
}

export const sendRegistrationEmailTemplate = async (userEmail: string, eventName: string, UserName: string): Promise<string> => {
    try {
        const subject: string = ` Confirmation, you have  ${eventName}`;
        const message: string = `Hello 👋🏻 ${UserName},  We hope you enjoy our services. Thank you for choosing us.`;

        const mailRes: string = await sendEmail(userEmail, subject, UserName, message);
        return mailRes;
    } catch (error: any) {
        return JSON.stringify(error.message, null, 500);
    }

}