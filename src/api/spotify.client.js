const axios = require('axios')
const querystring = require('querystring')

class SpotifyClient {
    #clientSecret;
    #clientId;
    constructor() {
        this._client = axios.create({
            baseURL: process.env.SPOTIFY_URL,
            timeout: 60000,
        })
        this.#setToken();
        this.#clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
        this.#clientId = process.env.SPOTIFY_CLIENT_ID;
    }

    async sendRequest(config) {
        const handleRequest = async () => {
            const response = await this._client.request(config)
            return response;
        }
        try {
            await handleRequest()
            const response = await handleRequest()
            return response.data
        } catch (error) {
            if (error.isAxiosError && error.response.status === 401) {
                await this.#createToken();
                const response = await handleRequest()
                return response.data
            }
            else {
                throw new Error(error.message || error.response.error)
            }
        }
    }

    async #createToken() {
        const authorization = 'Basic ' + (new Buffer(this.#clientId + ':' + this.#clientSecret).toString('base64'));
        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: {
                'Authorization': authorization,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                grant_type: 'client_credentials'
            }
        };
        const response = await axios.post(authOptions.url, querystring.stringify(authOptions.data), { headers: authOptions.headers })
        process.env.SPOTIFY_TOKEN = response.data.access_token;
        this.#setToken()
    }

    #setToken() {
        this._client.defaults.headers.common.Authorization = `Bearer ${process.env.SPOTIFY_TOKEN}`;
    }
}

module.exports = SpotifyClient;