import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchUsername } from '../spotifyFetcher';
import { useEffect, useState } from 'react';
import { User, Model } from '../interfaces';
import { set } from 'mobx';
import StatisticsView from '../views/statisticsView';
import { fetchTopItems } from '../spotifyFetcher';

// --- mock data ---

var nrItems = 0;
function genMock(name: string) {
    nrItems++;
    return {
        id: nrItems.toString() as string,
        name: name as string,
        type: "artist" as string,
        popularity: nrItems as number,
        uri: "spotify:artist:1" as string,
        images: [
            {
                height: 1 as number,
                url: "https://i.scdn.co/image/ab67616d0000b273e1e7f9c3f4a0b4c4f3f8f3f8" as string,
                width: 1 as number
            }
        ],
        external_urls: {
            spotify: "https://open.spotify.com/artist/1" as string,
        },
    }
}
const mockArtists = ["Prince", "Fleetwood Mac", "Something Else"]
const topItemsMock = {
    limit: 20 as number,
    next: null as string | null,
    offset: 0 as number,
    previous: null as string | null,
    total: 2 as number,
    items: mockArtists.map(genMock) as Array<any>,
}

// --- end mock data ---

export default
observer (
    function Statistics(props: {model: any}) {
        // this assumes that a UserModel is given...
        const navigate = useNavigate();
        if (!props.model.accessToken) {
            // navigate to login
            navigate("/");
        }

        const accessToken = props.model.accessToken || "";
        const [items, setItems] = useState([]);

        console.log(items)

        function onItemSelectedACB(item: any) {
            // TODO: implement
            console.log("onItemSelectedACB!", item);
        }


        if (!props?.model?.user) {
            // set location to login
            // redirect to login

            return <></>
        }

        return <StatisticsView user={props.model.user}
                            topItems={items}
                            onItemSelected={onItemSelectedACB}
                />;
    }
);