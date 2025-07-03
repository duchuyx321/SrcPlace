const OrderServices = require('../../services/OrderServices');
const PaymentService = require('../../services/PaymentService');
const Orders = require('../Model/Orders');
const PaymentMethods = require('../Model/PaymentMethods');
class ApiController {
    // [POST] --/api/payment/callback
    async paymentCallback(req, res, next) {
        try {
            console.log('callback :::');
            console.log(req.body);
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
            const [code, order_ID, paidAt] = orderId.split('_');
            const order = await Orders.findById(order_ID).select(
                'user_ID,orderable_ID',
            );

            const payment = await PaymentService.createPaymentDB({
                user_ID: order.user_ID,
                paymentable_type: 'e-wallet',
                paymentable_ID: order.orderable_ID,
                price: amount,
                status,
                paidAt,
                transactionCode: transId,
            });

            const resultAddPaymentInOrder = await OrderServices.editOrder({
                payment_ID: payment._id,
            });
            if (resultAddPaymentInOrder.status !== 200) {
                return res
                    .status(resultAddPaymentInOrder.status)
                    .json({ error: resultAddPaymentInOrder.error });
            }
            return res.status(200).json({ data: { message: 'successful!' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}
module.exports = new ApiController();
