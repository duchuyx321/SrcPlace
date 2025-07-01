const Projects = require('../../Model/Projects');
const PaymentMethods = require('../../Model/PaymentMethods');

const { decrypt } = require('../../../util/keyUtil');
const PaymentService = require('../../../services/PaymentService');
const VoucherServices = require('../../../services/VoucherServices');

require('dotenv').config();
class PaymentController {
    async createPayment(req, res, next) {
        try {
            const { user_ID } = req.user;
            const { paymentMethod_type, products } = req.body;
            let vouchers = req.body.vouchers;
            // total products
            const projects = await Projects.find({
                _id: { $in: products },
            }).select('price category_ID');
            let amount = projects.reduce(
                (total, item) => (total += item.price),
                0,
            );
            if (vouchers.length > 0) {
                const { discount, applyVoucher } = await VoucherServices({
                    user_ID,
                    vouchers,
                    projects,
                    amount,
                });
                amount -= discount;
                vouchers = applyVoucher;
            }
            // phương thức thanh toán
            let resultPayment;
            if (paymentMethod_type === 'wallet') {
                //  gọi đến phương thức chỉnh sửa wallet
            } else {
                const paymentMethod = await PaymentMethods.findOne({
                    _id: paymentMethod_type, // bên fe sẽ gửi lên là _id or wallet do bên be trả dữ liệu về danh sách
                    // status: 'active',
                }).select('config code');
                if (!paymentMethod) {
                    return res
                        .status(403)
                        .json({ error: 'Payment method not working!' });
                }
                const { apiKey, partnerCode, callbackUrl } =
                    paymentMethod.config;
                const accessKey = await decrypt(apiKey, 'apiKey');
                const secretKey = await decrypt(partnerCode, 'partnerCode');
                const orderInfo = `${paymentMethod.code}_${products.join(',')}_${new Date()}`;
                // khởi tạo thanh toán bằng bên thứ 3
                const paymentFn = PaymentService.gatewayMap(paymentMethod.code);
                if (!paymentFn)
                    return res
                        .status(400)
                        .json({ error: 'Unsupported gateway' });
                resultPayment = await paymentFn({
                    accessKey,
                    secretKey,
                    callback:
                        'https://c664-2405-4800-5f29-fc00-5831-c7ee-2d17-6fc9.ngrok-free.app/api/payment/callback', //callbackUrl
                    amount,
                    orderInfo,
                });
            }
            return res.status(200).json({
                data: {
                    message: 'payment successful',
                    vouchers,
                    resultPayment,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PaymentController();
