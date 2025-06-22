const fs = require('fs').promises;
const { driver } = require('../config/Driver/configDriver');

class DriverService {
    async uploadFileToDriver({
        localPath = '',
        fileName = '',
        mimeType = '',
    } = {}) {
        try {
            const allowedMimes = [
                'application/zip',
                'application/vnd.rar',
                'application/x-7z-compressed',
                'application/x-tar',
                'application/gzip',
            ];
            if (!allowedMimes.includes(mimeType)) {
                const resultDeleteLocal =
                    await this.deleteFileToLocal(localPath);
                if (resultDeleteLocal.status !== 200) {
                    return {
                        status: resultDeleteLocal.status,
                        error: resultDeleteLocal.message,
                    };
                }
                return { status: 403, error: 'File type not allowed' };
            }
            const createFile = await driver.files.create({
                requestBody: {
                    name: `${fileName}`,
                    mimeType,
                },
                media: {
                    mimeType,
                    body: localPath,
                },
                fields: 'id, webContentLink',
            });
            const resultDeleteLocal = await this.deleteFileToLocal(localPath);
            if (resultDeleteLocal.status !== 200) {
                return {
                    status: resultDeleteLocal.status,
                    error: resultDeleteLocal.message,
                };
            }
            return { status: 200, data: createFile.data };
        } catch (error) {
            const resultDeleteLocal = await this.deleteFileToLocal(localPath);
            if (resultDeleteLocal.status !== 200) {
                return {
                    status: resultDeleteLocal.status,
                    error: resultDeleteLocal.message,
                };
            }
            console.log(error);
            return { error: error.message, status: 501 };
        }
    }
    async deleteFileToDriver() {}
    async deleteFileToLocal(pathLocal) {
        try {
            await fs.unlink(pathLocal);
            return { status: 200, message: 'Xóa file thành công' };
        } catch (error) {
            console.log(error);
            return { status: 501, message: error.message };
        }
    }
}

module.exports = new DriverService();
