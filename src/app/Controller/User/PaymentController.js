const Projects = require('../../Model/Projects');
const PaymentMethods = require('../../Model/PaymentMethods');
const Vouchers = require('../../Model/Voucher');
const VoucherUsedBy = require('../../Model/VoucherUsedBy');
const { decrypt } = require('../../../util/keyUtil');
const PaymentService = require('../../../services/PaymentService');

require('dotenv').config();
class PaymentController {
    async callback(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
    async createPayment(req, res, next) {
        try {
            const { user_ID } = req.user;
            const { paymentMethod_ID, products, vouchers } = req.body;
            const paymentMethod = await PaymentMethods.findOne({
                _id: paymentMethod_ID,
                status: 'active',
            }).select('config code');
            if (!paymentMethod) {
                return res
                    .status(403)
                    .json({ error: 'Payment method not working!' });
            }
            const { apiKey, partnerCode, callbackUrl } = paymentMethod.config;
            const accessKey = await decrypt(apiKey, 'apiKey');
            const secretKey = await decrypt(partnerCode, 'partnerCode');

            // total products
            const projects = await Projects.find({
                _id: { $in: products },
            }).select('price');
            let amount = projects.reduce(
                (total, item) => (total += item.price),
                0,
            );
            if (vouchers.length !== 0) {
                // const voucher
            }
            // type = ''
            // amount = 0,
            // orderInfo = '',
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PaymentController();
