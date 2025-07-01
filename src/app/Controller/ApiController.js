class ApiController {
    // [POST] --/api/payment/callback
    async paymentCallback(req, res, next) {
        try {
            console.log('callback ::');
            console.log(req.body);
            return res.status(200).json({ data: { message: 'successful!' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}
module.exports = new ApiController();
