const { encrypt, decrypt } = require('../../util/keyUtil');
const PaymentMethod = require('../Model/PaymentMethods');

class PaymentMethodController {
    // [GET] --/admin/payments/overview
    async overview(req, res, next) {
        try {
            const [paymentMethods, countPaymentMethodDelete] =
                await Promise.all([
                    PaymentMethod.find().select('-config'),
                    PaymentMethod.countDocumentsDeleted(),
                ]);
            return res.status(200).json({
                data: {
                    paymentMethods,
                    countPaymentMethodDelete,
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
    // [POST] --/admin/paymentMethod/add
    async addPaymentMethod(req, res, next) {
        const file = req.file;
        try {
            const {
                name,
                code,
                status,
                type,
                apiKey,
                partnerCode,
                callbackUrl,
            } = req.body;
            let image_url = file?.path || '';
            if (
                !name ||
                !code ||
                !status ||
                !type ||
                !apiKey ||
                !partnerCode ||
                !callbackUrl
            ) {
                if (file) {
                    await CloudinaryService.deleteCloudinaryFile(file.filename);
                }
                return res
                    .status(403)
                    .json({ error: 'data upload not enough!' });
            }
            const encryptApiKey = await encrypt(apiKey, 'apiKey');
            const encryptPartnerCode = await encrypt(
                partnerCode,
                'partnerCode',
            );
            const newPaymentMethod = new PaymentMethod({
                name,
                code,
                image_url,
                status,
                type,
                config: {
                    apiKey: encryptApiKey,
                    callbackUrl,
                    partnerCode: encryptPartnerCode,
                },
            });
            await newPaymentMethod.save();
            return res
                .status(200)
                .json({ data: { message: 'add payment method successful' } });
        } catch (error) {
            if (file) {
                await CloudinaryService.deleteCloudinaryFile(file.filename);
            }
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [PATCH] --/admin/paymentMethod/edit
    async editPaymentMethod(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [PATCH] --/admin/paymentMethod/restore
    async restorePaymentMethod(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/paymentMethod/delete
    async deletePaymentMethod(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/paymentMethod/destroy
    async destroyPaymentMethod(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}

module.exports = new PaymentMethodController();
