import { observer } from 'mobx-react-lite';
import CheckoutView from '../views/CheckoutView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRecommendations, fetchTopItems, createPlaylist, addTracksToPlaylist, fetchCurrentUserPlaylists } from '../utils/spotifyFetcher';
import { get, set } from 'mobx';
import { UserTopItems, SpotifyArtist, SpotifyTrack, SpotifyItem } from '../interfaces';

import UserState, { User, Model } from '../interfaces';


export default
observer (
        function Checkout(props: {model: Model}) {
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
        const [recommendations, setRecommendations] = useState<SpotifyTrack[]>([]);
        const [userPlaylists, setUserPlaylists] = useState<{name: string, id: string}[]>([]);

        const [seedArtists, setSeedArtists] = useState<string[]>([]);
        const [seedTracks, setSeedTracks] = useState<string[]>([]);
        const [seedGenres, setSeedGenres] = useState<string[]>([]);

        const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
            console.log("exporting", newPlaylist, playlistIdentifier);
            if (newPlaylist) {
                // create new playlist
                let id = userState?.user?.id;
                if (!id) {
                    return;
                }
                createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
                    addTracksToPlaylist(accessToken, playlistId, recommendations.map((item) => item.uri));
                });
            }
            else {
                // add to existing playlist
                addTracksToPlaylist(accessToken, playlistIdentifier, recommendations.map((item) => item.uri));
            }
        }
        
        const numRecommendations = 20; // TODO: make this a slider

        function getRecommendationsACB() {
            getSeedItems();
            fetchRecommendations(accessToken, numRecommendations, seedArtists, seedTracks, seedGenres)
            .then((items) => { 
                setRecommendations(items); 
            })
        }

        function getUserPlaylists() {
            fetchCurrentUserPlaylists(accessToken).then((playlists) => {
                setUserPlaylists(playlists);
            });
        }

        function getSeedItems() {
            const cartItems = userState?.shoppingCart || [];

            setSeedArtists([]);
            setSeedTracks([]);
            setSeedGenres([]);

            for (let item of cartItems) {
                if (item.type === "artist") {
                    setSeedArtists((prev) => [...prev, item.id]);
                }
                else if (item.type === "track") {
                    setSeedTracks((prev) => [...prev, item.id]);
                }
                else if (item.type === "genre") {
                    setSeedGenres((prev) => [...prev, item.id]);
                }
            }
        }

        // get seed artists
        // Fetch items on load
        function onLoadACB() {
            getUserPlaylists();
            getSeedItems();
        }

        useEffect(onLoadACB, []);
        // useEffect(getRecommendationsACB, [seedArtists, seedTracks]); // update recommendations when seed artists or tracks change, too many requests


        return <CheckoutView
            onRemoveItem={(index: number) => {props.model.removeItemFromCart(index)}}
            cartItems={userState?.shoppingCart || []}
            recommendations={recommendations}
            onGetRecommendations={getRecommendationsACB} 
            onExport={onExportACB}
            userPlaylists={userPlaylists}/>;
    }
);