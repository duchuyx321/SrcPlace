const ms = require('ms');
const Card = require('../Model/Card');
const Projects = require('../Model/Projects');

class CardController {
    // [GET] --/user/card
    async getCards(req, res, next) {
        try {
            const { user_ID } = req.user;
            const now = new Date();
            const cards = await Card.find({
                user_ID,
                expiresAt: { $gt: now },
            })
                .select('project_ID -_id')
                .sort({ createdAt: -1 })
                .lean();

            const project_IDs = cards.map((c) => c.project_ID);
            const projects = await Projects.find({
                _id: { $in: project_IDs },
            }).select('title price image_url slug');
            return res.status(200).json({ data: projects });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [POST] --/user/card/add
    async addCards(req, res, next) {
        try {
            const { user_ID } = req.user;
            const { project_IDs } = req.body || [];
            const expiresAt = new Date(Date.now() + ms('30d'));
            if (!Array.isArray(project_IDs) || project_IDs.length === 0) {
                return res.status(400).json({
                    error: 'project_IDs is required and must be an array',
                });
            }
            await Promise.all(
                project_IDs.map((project_ID) =>
                    Card.findOneAndUpdateWithDeleted(
                        { user_ID, project_ID },
                        {
                            $set: {
                                expiresAt,
                                deleted: false,
                                deletedAt: null,
                            },
                        },
                        { new: true, upsert: true },
                    ),
                ),
            );
            return res
                .status(200)
                .json({ data: { message: 'Create card is successful!' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }

    // [DELETE] --/user/card/delete
    async deletedCards(req, res, next) {
        try {
            const { user_ID } = req.user;
            const { project_IDs } = req.body;
            if (!Array.isArray(project_IDs) || project_IDs.length === 0) {
                return res.status(400).json({
                    error: 'project_IDs is required and must be an array',
                });
            }
            await Promise.all(
                project_IDs.map((project_ID) =>
                    Card.delete({ user_ID, project_ID }),
                ),
            );
            return res
                .status(200)
                .json({ data: { message: 'delete cards is successful' } });
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
    // [DELETE] --/user/card/destroy
    async destroyCards(req, res, next) {
        try {
        } catch (error) {
            console.log(error);
            return res.status(501).json({ error: error.message });
        }
    }
}

module.exports = new CardController();
