const Orders = require('../app/Model/Orders');
class OrderService {
    async createOrder({
        user_ID = '',
        payment_ID = '',
        project_IDs = [],
        paymentMethod_ID = '',
        price = 0,
        status = 'pending',
    } = {}) {
        try {
            const order = new Orders({
                user_ID,
                payment_ID,
                paymentMethod_ID,
                project_IDs,
                price,
                status,
            });
            await order.save();
            return { order_ID: order._id };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}
module.exports = new OrderService();
