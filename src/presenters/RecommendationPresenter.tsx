import { observer } from 'mobx-react-lite';
import RecommendationsView from '../views/RecommendationView';
import {Model} from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchRecommendations } from '../spotifyFetcher';
import { set } from 'mobx';

interface Props {
    model: Model,
}


export default
observer (
        function Recommendations(props: Props) {
            // this assumes that a UserModel is given...
            const navigate = useNavigate();
            console.log("props.model", props.model);
            if (!props.model.userAuthToken) {
                // navigate to login
                // TODO: add notification that you need to login
                return <></>
            }

            const accessToken = props.model.userAuthToken || "";
            const [items, setItems] = useState([]);

            // Fetch items on load
            useEffect(() => { fetchRecommendations(accessToken, 20, [], [], ["pop"])
                .then((items) => { 
                    setItems(items); 
                })
            }, []);

        return <RecommendationsView recommendations={items}/>;
    }
);