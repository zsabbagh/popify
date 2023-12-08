import { observer } from 'mobx-react-lite';
import RecommendationsView from '../views/RecommendationView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRecommendations, fetchTopItems } from '../utils/spotifyFetcher';
import { set } from 'mobx';
import { SpotifyUserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';

import UserState, { User, Model } from '../interfaces';


export default
observer (
        function Recommendations(props: {model: UserState}) {
            // this assumes that a UserModel is given...
            const navigate = useNavigate();
            useEffect(() => {
              if (!props.model.userAuthToken) {
                // navigate to login
                // TODO: add notification that you need to login
                navigate('/');
              }
            }, []);

        const accessToken = props.model.userAuthToken || "";
        const [items, setItems] = useState([]);
        const [seedArtists, setSeedArtists] = useState<string[]>([]);
        const [seedTracks, setSeedTracks] = useState<string[]>([]);
        const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
        const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
        //const [timeRange, setTimeRange] = useState<string>("medium_term");

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

        function getRecommendationsACB() {
            const seedGenres = seedArtists.length == 0  && seedTracks.length == 0 ?  ["pop"] : [];
            fetchRecommendations(accessToken, numRecommendations, seedArtists, seedTracks, seedGenres)
            .then((items) => { 
                setItems(items); 
            })
        }

        function getTopArtistsACB() {
            const items = props.model?.user?.top?.short_term?.artists || [];
            setTopArtists(items?.slice(0, numTopItems));
        }

        function getTopTracksACB() {
            const items = props.model?.user?.top?.short_term?.tracks || [];
            setTopTracks(items?.slice(0, numTopItems));
        }

        // get seed artists
        // Fetch items on load
        function onLoadACB() {
            getTopArtistsACB();
            getTopTracksACB();
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
            seedArtists={seedArtists}/>;
    }
);