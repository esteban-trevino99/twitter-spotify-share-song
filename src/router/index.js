const RecommendationController = require('../controller/recommendation.controller')

const router = (server) => {
    server.get('/recommendation', (req, res, next) => new RecommendationController(req, res, next).getRecommendation());
    return server;
}
module.exports = router