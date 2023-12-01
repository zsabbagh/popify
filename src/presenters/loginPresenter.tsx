import { observer } from 'mobx-react-lite';
import LoginView from '../views/loginView';
import { useLocation } from 'react-router-dom';
import { fetchUsername } from '../spotifyFetcher';
import { useEffect, useState } from 'react';


export default
observer (
    function Login(props) {
        const location = useLocation(); // token is in the url as popify.com/login#access_token=...
        const accessToken:string = new URLSearchParams(location.hash).get("#access_token") || "";

        const [name, setName] = useState("");
        useEffect(() => {
            if (accessToken) {
                fetchUsername(accessToken).then(setName);
            }
        }, [accessToken]);

        return <LoginView name={name} />;
    }
);