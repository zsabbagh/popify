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

function isValidGenre(genre: string): boolean {
    return validGenres.indexOf(genre) !== -1;
}

const validGenres: string[] = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

export function getSeedsFromCart(cart: Array<ItemData>): {tracks: string[], artists: string[], genres: string[]} {
    let trackSeeds: string[] = [];
    let artistSeeds: string[] = [];
    let genreSeeds: string[] = [];

    cart.forEach((item) => {
        if (item.type === 'track') {
            trackSeeds.push(item.id);
        } else if (item.type === 'artist') {
            artistSeeds.push(item.id);
        } else if (item.type === 'genre') {
            if (isValidGenre(item.id)) {
                genreSeeds.push(item.id);
            }
            else {
                const artist: string = item?.artists?.at(0)?.id || '';
                if (artist) artistSeeds.push(artist);
            }
        } else if (item.type === 'album') {
            const artist: string = item?.artists?.at(0)?.id || '';
            if (artist) artistSeeds.push(artist);
        }
    });

    return {tracks: trackSeeds, artists: artistSeeds, genres: genreSeeds};
}