const cloudinary = require('../config/Cloudinary/connectCloudinary');
class CloudinaryService {
    // Delete
    async deleteCloudinaryFile(public_id) {
        try {
            await cloudinary.uploader.destroy(public_id);
            return {
                status: 200,
                message: 'delete successful!',
            };
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new CloudinaryService();
