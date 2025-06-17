module.exports = {
    LOGIN_WARING: {
        subject: 'Phát Hiện Đăng Nhập Bất Thường',
        text: (userAgent = '') =>
            `Chúng tôi phát hiện tài khoản của bạn vừa được đăng nhập từ một thiết bị lạ.\n` +
            `Tên thiết bị: ${userAgent}\n\n` +
            `Nếu đó không phải là bạn, vui lòng thay đổi mật khẩu ngay để bảo vệ tài khoản.`,
    },
    WELCOME: {
        subject: 'Chào mừng bạn đến với SrcPlace!',
        text: 'Cảm ơn vạn đã tạo tài khoản tại SrcPlace. Chúng tôi rất vui được đồng hành cùng với bạn!',
    },
};
