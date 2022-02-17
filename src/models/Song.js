class Song {
    constructor(song) {
        this.name = song.name;
        this.url = song.external_urls.spotify;
        this.album = song.album.name;
        this.artist = this.#getArtists(song.artists)
    }

    #getArtists(artists) {
        return artists.reduce((artist, currentArtist, currentIndex) => {
            artist += `${currentArtist.name}${currentIndex < artists.length - 1 ? ', ' : ''}`
            return artist
        }, '')
    }
}

module.exports = Song;