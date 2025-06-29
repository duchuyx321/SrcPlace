const axios = require('axios');
const Projects = require('../../Model/Projects');

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
            const { type, listProduct } = req.body;
            const paymentCode = listProduct.join(',');
            const projects = await Projects.find({
                _id: { $in: listProduct },
            }).select('price');

            let amount = projects.map((item) => amount + item.price);
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}

module.exports = new PaymentController();
