import { SpotifyArtist } from '../interfaces';

/* computes the top genres from a list of artists */
export
function computeTopGenres(artists: Array<SpotifyArtist> | undefined) {
    // return empty
    if (!artists) {
        return [];
    }
    let genres = new Map<string, any>();
    for (const item of artists) {
        const itemGenres = item?.genres || [];
        for (const genre of itemGenres) {
            if (genres.has(genre)) {
                genres.get(genre).popularity++;
            } else {
                genres.set(genre, {
                    id: genre,
                    type: 'genre',
                    name: genre,
                    popularity: 1,
                });
            }
        }
    }
    // get values from map
    return Array
        .from(genres.values())
        .sort((a, b) => b.popularity - a.popularity);
}