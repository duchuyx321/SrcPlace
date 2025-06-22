const Projects = require('../Model/Projects');
const CloudinaryService = require('../../services/CloudinaryService');
const DriverService = require('../../services/DriverService');
class ProjectsController {
    // [GET] --/admin/projects/overview?filter=active&sort&limit=10&page=1
    async overview(req, res, next) {
        try {
            const filter = req.query.filter || 'active';
            const sort = req.query.sort || 'createdAt_desc';
            const limit = parseInt(req.query.limit) || 10;
            const page = parseInt(req.query.page) || 1;
            const listSort = {
                createdAt_asc: { createdAt: 1 },
                createdAt_desc: { createdAt: -1 },
                name_asc: { name: 1 },
                name_desc: { name: -1 },
            };
            const orderBy = listSort[sort] || { createdAt: -1 };
            const skip = (page - 1) * limit;
            const is_delete = filter !== 'active';
            const [projects, countProjectsDelete] = await Promise.all([
                Projects.findWithDeleted({ deleted: is_delete })
                    .sort(orderBy)
                    .skip(skip)
                    .limit(limit),
                Projects.countDocumentsDeleted(),
            ]);
            return res.status(200).json({
                data: {
                    projects,
                    countProjectsDelete,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [POST] --/admin/projects/upload
    async uploadProject(req, res, next) {
        try {
            const file = req.file;
            const resultUpToDriver = await DriverService.uploadFileToDriver({
                localPath: file.path,
                fileName: file.filename,
                mimeType: file.mimetype,
            });
            if (resultUpToDriver.status !== 200) {
                return res
                    .status(resultUpToDriver.status)
                    .json({ error: resultUpToDriver.error });
            }
            console.log(resultUpToDriver.data);
            return res.status(200).json({
                data: {
                    message: 'upload file successful',
                    data: resultUpToDriver.data,
                },
            });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [POST] --/admin/projects/add
    async addProjects(req, res, next) {
        try {
            const { user_ID } = req.user;
            const {
                category_ID,
                title,
                price,
                description,
                teachTags,
                video_url,
                download_url,
            } = req.body;
            let image_url = req.file?.path || '';
            if (
                (category_ID,
                !title || !price || !description || !teachTags || !video_url)
            ) {
                return res
                    .status(403)
                    .json({ error: 'data upload not enough!' });
            }
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [PATCH] --/admin/projects/edit
    async editProjects(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [PATCH] --/admin/projects/restore
    async restoreProjects(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/projects/delete
    async deleteProjects(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/admin/projects/destroy
    async destroyProjects(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}
module.exports = new ProjectsController();
