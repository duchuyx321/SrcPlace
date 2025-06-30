const axios = require('axios');
class PaymentService {
    async createPaymentMoMo({
        accessKey = '',
        secretKey = '',
        type = '',
        callback = '',
        amount = 0,
        orderInfo = '',
    }) {
        //parameters
        const partnerCode = type;
        const redirectUrl =
            'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
        const ipnUrl = callback;
        const requestType = 'payWithMethod';
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = '';
        const orderGroupId = '';
        const autoCapture = true;
        const lang = 'vi';

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        const rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            amount +
            '&extraData=' +
            extraData +
            '&ipnUrl=' +
            ipnUrl +
            '&orderId=' +
            orderId +
            '&orderInfo=' +
            orderInfo +
            '&partnerCode=' +
            partnerCode +
            '&redirectUrl=' +
            redirectUrl +
            '&requestId=' +
            requestId +
            '&requestType=' +
            requestType;
        //signature
        const crypto = require('crypto');
        const signature = crypto
            .createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: 'Test',
            storeId: 'MomoTestStore',
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });
        //Create the HTTPS objects
        const option = {
            method: 'POST',
            url: 'https:/test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        };
        let result;
        try {
            result = await axios(option);
            return {
                status: 200,
                message: result.data,
            };
        } catch (error) {
            console.log(error);
            return {
                status: 500,
                message: 'server error',
            };
        }
    }
}

module.exports = new PaymentService();
