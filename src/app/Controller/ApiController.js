const PaymentService = require('../../services/PaymentService');
const PaymentMethods = require('../Model/PaymentMethods');
class ApiController {
    // [POST] --/api/payment/callback
    async paymentCallback(req, res, next) {
        try {
            console.log(callback);
            const {
                partnerCode,
                orderId,
                requestId,
                amount,
                orderInfo,
                transId,
                resultCode,
                signature,
            } = req.body;
            // lấy accessKey và secretKey
            const paymentMethod = await PaymentMethods.findOne({
                code: partnerCode,
                status: 'active',
            });
            // kiểm tra chữ kí
            const correctSignature = PaymentService.createSignature({
                accessKey,
                secretKey,
                partnerCode,
                orderId,
                requestId,
                amount,
                orderInfo,
                extraData,
                ipnUrl,
                redirectUrl,
                requestType,
            });
            if (correctSignature !== signature) {
                throw new Error('fake payment!');
            }
            let status = resultCode === 0 ? 'success' : 'failed';
            //  thêm vào payment và cập nhật order
            return res.status(200).json({ data: { message: 'successful!' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}
module.exports = new ApiController();
