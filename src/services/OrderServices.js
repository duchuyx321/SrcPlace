const Orders = require('../app/Model/Orders');
class OrderService {
    async createOrder({
        user_ID = '',
        payment_ID = null,
        project_IDs = [],
        orderable_type = 'e-wallet',
        orderable_ID = '',
        price = 0,
        status = 'pending',
    } = {}) {
        try {
            const order = {
                user_ID,
                orderable_ID,
                orderable_type,
                project_IDs,
                price,
                status,
            };
            if (payment_ID) {
                order['payment_ID'] = payment_ID;
            }
            const createOrder = new Orders(order);
            await createOrder.save();
            return { order_ID: createOrder._id };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}
module.exports = new OrderService();
