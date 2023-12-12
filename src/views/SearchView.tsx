import { SpotifyAlbum, SpotifyArtist, SpotifyTrack } from "../interfaces";

export default
function SearchView(props: {artists: SpotifyArtist[], albums: SpotifyAlbum[], tracks: SpotifyTrack[]}) {
    return (
        <div>
            <div>
                <h1>Artists</h1>
                {props.artists.map((artist) => {
                    return (
                        <div>
                            <h3>{artist.name}</h3>
                        </div>
                    );
                })}
            </div>
            <div>
                <h1>Albums</h1>
                {props.albums.map((album) => {
                    return (
                        <div>
                            <h3>{album.name}</h3>
                        </div>
                    );
                })}
            </div>
            <div>
                <h1>Tracks</h1>
                {props.tracks.map((track) => {
                    return (
                        <div>
                            <h3>{track.name}</h3>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}