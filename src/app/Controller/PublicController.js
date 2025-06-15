const Projects = require('../Model/Projects');

class PublicController {
    // [GET] --/
    async getProject(req, res, next) {
        try {
            const [paidProjects, freeProjects] = await Promise.all([
                Projects.find({ price: { $gt: 0 } }),
                Projects.find({ price: { $eq: 0 } }),
            ]);
            return res
                .status(200)
                .json({ data: { paidProjects, freeProjects } });
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: error.message });
        }
    }
    // [GET] --/search?limit=&page
    async search(req, res, next) {
        try {
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PublicController();
