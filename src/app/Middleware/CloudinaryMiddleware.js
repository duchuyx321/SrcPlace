const multer = require('multer');
const cloudinary = require('../../config/Cloudinary/connectCloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { newCode } = require('../../util/codeUtil');

const newStorage = (type) => {
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: type,
            public_id: async (req, file) => {
                const codeFile = await newCode({ isUpLower: false });
                return `SrcPlace_${Date.now()}_${codeFile}_${file.originalname}`;
            },
        },
    });
    return storage;
};

const uploadCloudinary = ({
    type = 'Avatar', // ["Avatar", "Logo", "Thumbnail"]
} = {}) => {
    const storage = newStorage(type);
    return multer({ storage, limits: { fieldSize: 3 * 1024 * 1024 } });
};

module.exports = { uploadCloudinary };
