class PaymentService {
    async createPayment({
        accessKey = '',
        secretKey = '',
        type = '',
        callback = '',
        amount = 0,
        paymentCode = '',
    }) {
        //parameters
        const accessKey = accessKey;
        const secretKey = secretKey;
        const orderInfo = `pay with {type}`;
        const partnerCode = type.toLowerCase();
        const redirectUrl = `${process.env.URL_SERVER_NGROK}payment`; // chỉnh sửa cho phù hợp với fe
        const ipnUrl = callback; // URL_SERVER
        const requestType = 'payWithMethod';
        const amount = amount;
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = '';
        const paymentCode = paymentCode;
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
