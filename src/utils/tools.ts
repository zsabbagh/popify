import {
    SpotifyArtist,
    ItemData,
} from '../interfaces';

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

export
function getItemInformation(item: any, index?: number): ItemData | undefined {
    if (!item) {
        return undefined;
    }
    const { id, name, type, uri } = item;
    const images = item?.images || item?.album?.images || [];
    const image = images ? images[0]?.url : '';
    const popularity = item?.popularity || item?.album?.popularity || 0;
    const album = item?.album?.name || '';
    const genres = item?.genres || [];
    let artists = [];
    if (item?.artists) {
        artists = item.artists.map((artist: any) => artist.name);
    }
    return {
        id,
        name,
        type,
        uri,
        image,
        popularity,
        album,
        artists,
        index,
        genres,
    }
}