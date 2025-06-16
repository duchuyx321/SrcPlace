const nodemailer = require('nodemailer');
const configMailer = require('../config/Mail/ConnectMailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: configMailer.MAILER.USER,
        pass: configMailer.MAILER.PASS,
    },
});
const message = (to, subject, text, html) => {
    return {
        from: `"SrcPlace Support" <${configMailer.MAILER.USER}>`,
        to,
        subject,
        text,
        html,
    };
};
// mình có thể bỏ qua việc chớ nó gửi xong mới bắt đầu hoạt đọng tiếp
const emailSender = async ({
    to = '',
    subject = '',
    text = '',
    html = '',
} = {}) => {
    const info = await transporter.sendMail(message(to, subject, text, html));
    return info;
};

module.exports = { emailSender };
