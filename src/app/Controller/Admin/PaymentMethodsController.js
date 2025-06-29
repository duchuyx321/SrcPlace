const CloudinaryService = require('../../../services/CloudinaryService');
const { encrypt, decrypt } = require('../../../util/keyUtil');
const PaymentMethod = require('../../Model/PaymentMethods');

class PaymentMethodsController {
    // [GET] --/admin/paymentMethods/overview
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
    // [POST] --/admin/paymentMethods/add
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
    // [PATCH] --/admin/paymentMethods/edit
    async editPaymentMethod(req, res, next) {
        const file = req.file;
        try {
            let { paymentMethod_ID, ...attributeChanges } = req.body;
            if (file) {
                attributeChanges = {
                    ...attributeChanges,
                    image_url: file.path,
                };
            }
            if (Object.keys(attributeChanges).length === 0) {
                if (file) {
                    await CloudinaryService.deleteCloudinaryFile(file.filename);
                }
                return res
                    .status(403)
                    .json({ error: 'data upload not enough!' });
            }
            const edit = await PaymentMethod.updateOne(
                {
                    _id: paymentMethod_ID,
                },
                attributeChanges,
            );
            if (edit.modifiedCount === 0) {
                if (file) {
                    await CloudinaryService.deleteCloudinaryFile(file.filename);
                }
                return res
                    .status(501)
                    .json({ error: 'edit payment method is false!' });
            }
            return res.status(200).json({
                data: { message: 'edit payment method is successful!' },
            });
        } catch (error) {
            if (file) {
                await CloudinaryService.deleteCloudinaryFile(file.filename);
            }
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [PATCH] --/admin/paymentMethods/restore
    async restorePaymentMethod(req, res, next) {
        try {
            const [paymentMethod_IDs] = req.body;
            if (
                !Array.isArray(paymentMethod_IDs) ||
                paymentMethod_IDs.length === 0
            ) {
                return res.status(403).json({ error: 'data is not exits!' });
            }
            await PaymentMethod.restore({ _id: { $in: paymentMethod_IDs } });
            return res
                .status(200)
                .json({ data: { message: 'restore is successful' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/paymentMethods/delete
    async deletePaymentMethod(req, res, next) {
        try {
            const { paymentMethod_IDs } = req.body;
            if (
                !Array.isArray(paymentMethod_IDs) ||
                paymentMethod_IDs.length === 0
            ) {
                return res.status(403).json({ error: 'data is not exits!' });
            }
            await PaymentMethod.delete({ _id: { $in: paymentMethod_IDs } });
            return res
                .status(200)
                .json({ data: { message: 'delete is successful' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/paymentMethods/destroy
    async destroyPaymentMethod(req, res, next) {
        try {
            const { paymentMethod_IDs } = req.body;
            if (
                !Array.isArray(paymentMethod_IDs) ||
                paymentMethod_IDs.length === 0
            ) {
                return res.status(403).json({ error: 'data is not exits!' });
            }
            await PaymentMethod.deleteMany({ _id: { $in: paymentMethod_IDs } });
            return res
                .status(200)
                .json({ data: { message: 'destroy is successful' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}

module.exports = new PaymentMethodsController();
