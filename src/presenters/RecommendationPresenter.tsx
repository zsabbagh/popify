import { observer } from 'mobx-react-lite';
import RecommendationsView from '../views/RecommendationView';
import {Model} from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRecommendations, fetchTopItems } from '../spotifyFetcher';
import { set } from 'mobx';


export default
observer (
        function Recommendations(props: {model: any}) {
            // this assumes that a UserModel is given...
            const navigate = useNavigate();
        if (!props.model.accessToken) {
            // navigate to login
            // TODO: add notification that you need to login
            navigate("/");
        }

        const accessToken = props.model.accessToken || "";
        const [items, setItems] = useState([]);
        const [seedArtists, setSeedArtists] = useState<string[]>([]);
        const [seedTracks, setSeedTracks] = useState<string[]>([]);
        const [topArtists, setTopArtists] = useState<string[]>([]);
        const [topTracks, setTopTracks] = useState<string[]>([]);
        //const [timeRange, setTimeRange] = useState<string>("medium_term");

        function onArtistSelectedACB(id: string, name:string) {
            console.log("artist selected", name);
            if (seedArtists.includes(id)) {
                setSeedArtists(seedArtists.filter((id) => id != id));
            } else {
                setSeedArtists(seedArtists.concat(id));
            }
            console.log("seed artists", seedArtists);
        }
        
        function onTrackSelectedACB(id: string, name:string) {
            console.log("track selected", name);
            if (seedTracks.includes(id)) {
                setSeedTracks(seedTracks.filter((id) => id != id));
            } else {
                setSeedTracks(seedTracks.concat(id));
            }
            console.log("seed tracks", seedTracks);
        }
        
        const numRecommendations = 20;
        const numTopItems = 20;

        function getRecommendationsACB() {
            const seedGenres = seedArtists.length == 0  && seedTracks.length == 0 ?  ["pop"] : [];
            fetchRecommendations(accessToken, numRecommendations, seedArtists, seedTracks, seedGenres)
            .then((items) => { 
                setItems(items); 
            })
        }

        function getTopArtistsACB() {
            fetchTopItems(accessToken, "artists", numTopItems)
            .then((items) => { 
                setTopArtists(items); 
            })
        }

        function getTopTracksACB() {
            fetchTopItems(accessToken, "tracks", numTopItems)
            .then((items) => { 
                setTopTracks(items); 
            })
        }

        // get seed artists
        // Fetch items on load
        function onLoadACB() {
            getTopArtistsACB();
            getTopTracksACB();
            getRecommendationsACB();
        }

        useEffect(onLoadACB, []);
        useEffect(getRecommendationsACB, [seedArtists, seedTracks]); // update recommendations when seed artists or tracks change

        return <RecommendationsView topArtists={topArtists} topTracks={topTracks} recommendations={items} onArtistSelected={onArtistSelectedACB} onTrackSelected={onTrackSelectedACB}/>;
    }
);