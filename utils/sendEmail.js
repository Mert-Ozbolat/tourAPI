const nodemailer = require('nodemailer')

const sendMail = async () => {

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    const mailOptions = {
        from: '"Mert Ozbolat" <mertozbolat008@gmail.com>', // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.text, // plain text body 
        html: options.html, // html body
    };

    await transporter.sendMail(mailOptions);
}


module.exports = sendMail
