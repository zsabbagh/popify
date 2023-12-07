import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchUsername } from '../spotifyFetcher';
import { useEffect, useState } from 'react';
import { User, Model } from '../interfaces';
import { set } from 'mobx';
import StatisticsView from '../views/statisticsView';
import { fetchTopItems } from '../spotifyFetcher';

export default
observer (
    function Statistics(props: {model: any}) {
        // this assumes that a UserModel is given...
        const navigate = useNavigate();
        if (!props.model.accessToken) {
            // navigate to login
            // TODO: add notification that you need to login
            navigate("/");
        }

        const accessToken = props.model.accessToken || "";
        const [items, setItems] = useState([]);
        const [limit, setLimit] = useState(5);

        async function onLimitChangeACB(limit: number) {
            setLimit(limit);
            if (limit > items.length) {
                // we only need to fetch more items if the limit
                // is higher than the number of items we already have
                const offset = items.length;
                const newLimit = limit - items.length;
                fetchTopItems(accessToken, "artists", newLimit, offset)
                    .then((newItems) => { 
                        setItems(items.concat(newItems)); 
                    })
            }
        }

        /* fetch items when loading! */
        useEffect(() => { fetchTopItems(accessToken, "artists", limit)
            .then((items) => { 
                setItems(items); 
            })
        }, []);

        async function onItemSelectedACB(item: any) {
            // TODO: implement
            console.log("onItemSelected not implemented!", item);
        }


        if (!props?.model?.user) {
            // set location to login
            // redirect to login
            return <></>
        }

        return <StatisticsView user={props.model.user}
                            topItems={items.slice(0, limit)}
                            onItemSelected={onItemSelectedACB}
                            onLimitChange={onLimitChangeACB}
                />;
    }
);