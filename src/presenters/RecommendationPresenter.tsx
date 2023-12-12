import { observer } from 'mobx-react-lite';
import RecommendationsView from '../views/RecommendationView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRecommendations, fetchTopItems, createPlaylist, addTracksToPlaylist, fetchCurrentUserPlaylists } from '../utils/spotifyFetcher';
import { set } from 'mobx';
import { UserTopItems, SpotifyArtist, SpotifyTrack, SpotifyItem } from '../interfaces';

import UserState, { User, Model } from '../interfaces';


export default
observer (
        function Recommendations(props: {model: Model}) {
            // this assumes that a UserModel is given...
        
        const userState: UserState = props.model?.userState;
        const navigate = useNavigate();
        useEffect(() => {
            if (!userState.userAuthToken) {
                // navigate to login
                // TODO: add notification that you need to login
                navigate('/');
            }
            props.model.updateUserTopItems();
        }, []);

        const accessToken = userState.userAuthToken || "";
        const [items, setItems] = useState<SpotifyTrack[]>([]);
        const [seedArtists, setSeedArtists] = useState<string[]>([]);
        const [seedTracks, setSeedTracks] = useState<string[]>([]);
        const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
        const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
        const [userPlaylists, setUserPlaylists] = useState<{name: string, id: string}[]>([]);

        const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
            console.log("exporting", newPlaylist, playlistIdentifier);
            if (newPlaylist) {
                // create new playlist
                let id = userState?.user?.id;
                if (!id) {
                    return;
                }
                createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
                    addTracksToPlaylist(accessToken, playlistId, items.map((item) => item.uri));
                });
            }
            else {
                // add to existing playlist
                addTracksToPlaylist(accessToken, playlistIdentifier, items.map((item) => item.uri));
            }
        }

        function onArtistSelectedACB(id: string, name:string) {
            console.log("artist selected", name);
            if (seedArtists.includes(id)) {
                setSeedArtists(seedArtists.filter((listid) => listid != id));
            } else {
                setSeedArtists(seedArtists.concat(id));
            }
            console.log("seed artists", seedArtists);
        }
        
        function onTrackSelectedACB(id: string, name:string) {
            console.log("track selected", name);
            if (seedTracks.includes(id)) {
                setSeedTracks(seedTracks.filter((listid) => listid != id));
            } else {
                setSeedTracks(seedTracks.concat(id));
            }
            console.log("seed tracks", seedTracks);
        }
        
        const numRecommendations = 10;
        const numTopItems = 10;

        const topItems: UserTopItems | undefined = userState.topItems?.shortTerm || undefined;

        function getRecommendationsACB() {
            const seedGenres = seedArtists.length == 0  && seedTracks.length == 0 ?  ["pop"] : [];
            fetchRecommendations(accessToken, numRecommendations, seedArtists, seedTracks, seedGenres)
            .then((items) => { 
                setItems(items); 
            })
        }

        function getTopArtistsACB() {
            const items: Array<SpotifyArtist> = userState.topItems?.shortTerm?.artists || [];
            setTopArtists(items?.slice(0, numTopItems));
        }

        function getTopTracksACB() {
            const items: Array<SpotifyTrack> = userState.topItems?.shortTerm?.tracks || [];
            setTopTracks(items?.slice(0, numTopItems));
        }

        function getUserPlaylistsACB() {
            fetchCurrentUserPlaylists(accessToken).then((playlists) => {
                setUserPlaylists(playlists);
            });
        }

        // get seed artists
        // Fetch items on load
        function onLoadACB() {
            getTopArtistsACB();
            getTopTracksACB();
            getUserPlaylistsACB();
        }

        useEffect(onLoadACB, []);
        // useEffect(getRecommendationsACB, [seedArtists, seedTracks]); // update recommendations when seed artists or tracks change, too many requests


        return <RecommendationsView
            topArtists={topArtists}
            topTracks={topTracks} 
            recommendations={items}
            onGetRecommendations={getRecommendationsACB} 
            onArtistSelected={onArtistSelectedACB}
            onTrackSelected={onTrackSelectedACB}
            seedTracks={seedTracks}
            seedArtists={seedArtists}
            onExport={onExportACB}
            userPlaylists={userPlaylists}/>;
    }
);