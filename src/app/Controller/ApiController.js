const OrderServices = require('../../services/OrderServices');
const PaymentService = require('../../services/PaymentService');
const Orders = require('../Model/Orders');
const PaymentMethods = require('../Model/PaymentMethods');
const { decrypt, newSignatureCallback } = require('../../util/keyUtil');
class ApiController {
    // [POST] --/api/payment/callback
    async paymentCallback(req, res, next) {
        let order_IDs = [];
        try {
            const {
                partnerCode,
                amount,
                extraData,
                message,
                orderId,
                orderInfo,
                orderType,
                payType,
                requestId,
                responseTime,
                resultCode,
                transId,
                signature,
            } = req.body;
            console.log(req.body);
            // lấy accessKey và secretKey
            let status = resultCode === 0 ? 'success' : 'failed';
            //  thêm vào payment và cập nhật order
            if (!orderInfo || orderInfo.split('_').length !== 3) {
                throw new Error('invalid orderInfo format!');
            }
            const [code, order_ID, paidAt] = orderInfo.split('_');
            const order = await Orders.findById(order_ID).select(
                'user_ID orderable_ID orderable_type',
            );
            order_IDs.push(order_ID);
            if (!order) {
                throw new Error('Order not found!');
            }
            const paymentMethod = await PaymentMethods.findOne({
                _id: order.orderable_ID,
                status: 'active',
            }).select('config');
            if (!paymentMethod) {
                throw new Error('not payment method!');
            }
            if (!signature) {
                throw new Error('fake payment!');
            }
            // kiểm tra chữ kí
            const { accessKey, secretKey } = paymentMethod.config;
            const decryptAccessKey = await decrypt(accessKey, 'accessKey');
            const decryptSecretKey = await decrypt(secretKey, 'secretKey');
            const decryptPartnerCode = await decrypt(
                paymentMethod.config?.partnerCode,
                'partnerCode',
            );
            if (partnerCode !== decryptPartnerCode) {
                throw new Error('fake Payment!');
            }
            const signatureServer = newSignatureCallback({
                accessKey: 'F8BBA842ECF85', //decryptAccessKey,
                secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz', //decryptSecretKey,
                partnerCode: 'MOMO', //decryptPartnerCode,
                amount,
                extraData,
                message,
                orderId,
                orderInfo,
                orderType,
                payType,
                requestId,
                responseTime,
                resultCode,
                transId,
            });
            if (signature !== signatureServer) {
                throw new Error('fake Payment!');
            }
            // tạo mới payment
            const payment = await PaymentService.createPaymentDB({
                user_ID: order.user_ID,
                paymentable_type: order.orderable_type,
                paymentable_ID: order.orderable_ID,
                price: amount,
                status,
                paidAt,
                transactionCode: transId,
            });
            // sửa order
            const resultAddPaymentInOrder = await OrderServices.editOrder({
                order_ID: order_ID,
                payment_ID: payment._id,
                status,
            });
            if (resultAddPaymentInOrder.status !== 200) {
                return res
                    .status(resultAddPaymentInOrder.status)
                    .json({ error: resultAddPaymentInOrder.error });
            }
            return res.status(200).json({ data: { message: 'successful!' } });
        } catch (error) {
            await OrderServices.destroyOrder({ order_IDs });
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}
module.exports = new ApiController();
