const BaseController = require('./base.controller')
const SpotifyClient = require('../api/spotify.client')
const { randomIndex } = require('./helpers/index');
const SongModel = require('../models/Song')
class RecommendationController extends BaseController {
    async getRecommendation() {
        try {
            this.spotifyClient = new SpotifyClient();
            const params = this.#getParams()
            const config = {
                method: 'GET',
                url: 'v1/search',
                params,
            }
            const data = await this.spotifyClient.sendRequest(config)
            const song = new SongModel(data.tracks[randomIndex(data.tracks)])
            this.res.send(200, { song })
        } catch (error) {
            console.log(error)
        }
        this.next()
    }

    #getParams() {

    }

}

module.exports = RecommendationController