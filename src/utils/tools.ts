import {
    SpotifyArtist,
    ItemData,
} from '../interfaces';

/* computes the top genres from a list of artists */
export
function computeTopGenres(artists: Array<SpotifyArtist> | undefined): Array<ItemData> {
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
                const artists = genres.get(genre).artists;
                if (!artists.some((x: ItemData) => x.id === item.id)) {
                    artists.push(item);
                }
            } else {
                genres.set(genre, {
                    id: genre,
                    type: 'genre',
                    name: genre,
                    popularity: 1,
                    artists: [item],
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
    const album = item?.album || undefined;
    const genres = item?.genres || [];
    let artists = [];
    if (item?.artists) {
        artists = item.artists;
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

export function itemMatchesQuery(itemData: ItemData | undefined, query?: string): boolean {
    if (!itemData) {
        return false;
    }
    if (!query) {
        return true;
    }
    const { name, artists, album, genres } = itemData;
    const queryLower = query.toLowerCase();
    function matchesString(str: string | undefined) {
        if (!str) {
            return false;
        }
        return str.toLowerCase().includes(queryLower);
    }
    if (matchesString(name)) {
        return true;
    } else if (artists?.some((x) => matchesString(x.name))) {
        return true;
    } else if (matchesString(album?.name)) {
        return true;
    } else if (genres?.some((x) => matchesString(x))) {
        return true;
    }
    return false;
}