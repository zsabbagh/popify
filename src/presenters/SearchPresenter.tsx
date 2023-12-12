import { observer } from "mobx-react-lite";
import { Model, SpotifyItem, SpotifyTrack, SpotifyAlbum, SpotifyArtist } from "../interfaces";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { query } from "firebase/firestore";
import SearchView from "../views/SearchView";
import { search } from "../utils/spotifyFetcher";

export default observer(function Search(props: { model: Model }) {
    // this assumes that a UserModel is given...
    const navigate = useNavigate();
    const location = useLocation();

    const [artists, setArtists] = useState<SpotifyArtist[]>([]);
    const [tracks, setTracks] = useState<SpotifyTrack[]>([]);
    const [albums, setAlbums] = useState<SpotifyAlbum[]>([]);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<SpotifyItem[]>([]);
    const [searchTab, setSearchTab] = useState("artists");
    
    const handleSearchResults = (result: {tracks: {items: SpotifyTrack[]}, artists: {items: SpotifyArtist[]}, albums: {items: SpotifyAlbum[]}}) => {
        setArtists(result.artists.items);
        setTracks(result.tracks.items);
        setAlbums(result.albums.items);
    }
    const [searchParams, setSearchParams] = useSearchParams();
    
    const onItemSelected = (item: SpotifyItem) => {
        console.log("item selected", item);
    }

    const onLocationChange = (location: string) => {
        setSearchTab(location);
        if (location === "artists") {
            setItems(artists);
        } else if (location === "tracks") {
            setItems(tracks);
        } else if (location === "albums") {
            setItems(albums);
        }
    }

    useEffect(() => {
        if (!props.model.userState.userAuthToken) {
        // navigate to login
        // TODO: add notification that you need to login
            navigate('/');
        }

    }, []);

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            search(props.model.userState.userAuthToken || "", query).then(handleSearchResults);
        }
    }, [location]);
    
    return (
        <SearchView location={searchTab} items={items} page={page} setPage={setPage} onLocationChange={onLocationChange} onItemSelected={onItemSelected}></SearchView>
    );
}
);