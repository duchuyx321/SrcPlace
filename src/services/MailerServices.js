const Notification = require('../app/Model/Notification');
const MailTemplates = require('../config/Mail/MailTemplates');
const { emailSender } = require('../util/mailerUtil');
const SocketService = require('./SocketService');

class MailerServices {
    async sendMailerAndNotify({
        io,
        user_IDs = [],
        type = '', //LOGIN_WARING, WELCOME
        to = [],
        userAgent = '',
        first_name = '',
        last_name = '',
        subject = '',
        text = '',
    } = {}) {
        try {
            if (!to) {
                return {
                    status: 400,
                    error: 'Missing recipient email address',
                };
            }
            if (type && MailTemplates[type]) {
                const template = MailTemplates[type];
                subject = subject || template.subject;
                text =
                    text ||
                    (typeof template.text === 'function'
                        ? template.text(userAgent)
                        : template.text);
            }
            const html = this.designHtmlMailer({ first_name, last_name, text });
            const info = await emailSender({ to, html, subject, text });
            // gửi thông báo đến cho người dùng
            const data = {
                subject,
                text,
            };
            SocketService.emitToUsers(io, user_IDs, type, data);
            // lưu thông báo vào db
            return {
                status: 200,
                message: 'Send and Notify mail successful',
                info,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                error: error.message,
            };
        }
    }

    designHtmlMailer({ first_name = '', last_name = '', text = '' } = {}) {
        const html = `
            <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f5f5f5;">
                <div style="width:100%; padding: 20px 0; display:flex; justify-content:center; background-color:#f5f5f5;">
                    <div style="width:600px; background-color:#ffffff; border:1px dashed #333; border-radius:8px; overflow:hidden;">

                        <!-- Header -->
                        <div style="background: #b8e6fb; padding:16px; display:flex; align-items:center;">
                            <img src="https://res.cloudinary.com/dxkcm49hy/image/upload/v1750135004/srcPlace_logo_gray_dhwxmr.jpg"
                                alt="SrcPlace Logo" style="height:60px; margin-right:16px;" />
                            <h3 style="font-size:24px; color:#333; margin:0;">SrcPlace - Nơi cung cấp đồ án chất lượng</h3>
                        </div>

                        <!-- Body -->
                        <div style="padding:24px; border-top:1px dashed #333; border-bottom:1px dashed #333;">
                            <p style="font-size:16px; margin-bottom:20px;"><strong>${first_name + ' ' + last_name}</strong> - thân mến,</p>
                            <p style="font-size:16px; margin-bottom:20px;">
                                ${text}
                            </p>
                            <p style="font-size:16px;">Trân trọng,<br /> <strong>Supporter SrcPlace</strong></p>
                        </div>

                        <!-- Footer -->
                        <div style="text-align:center;">
                            <img src="https://res.cloudinary.com/dxkcm49hy/image/upload/v1750138158/thumb_gmail_ak5zx7.png"
                                alt="Footer Image" style="width:100%; display:block;" />
                        </div>
                    </div>
                </div>
            </body>
            `;
        return html;
    }
}

module.exports = new MailerServices();
