import { observer } from 'mobx-react-lite';
import LoginView from '../views/LoginView';
import { useLocation } from 'react-router-dom';
import { fetchUsername } from '../spotifyFetcher';
import { useEffect, useState } from 'react';
import {User} from '../interfaces';
import { set } from 'mobx';


export default
observer (
    function Login(props: {model: User}) {
        /*const location = useLocation(); // token is in the url as popify.com/login#access_token=...
        const accessToken:string = new URLSearchParams(location.hash).get("#access_token") || "";

        const [name, setName] = useState("");

        function loginACB(username: string) {
            setName(username);
            props.model.setUserName(username);
            props.model.setLoggedIn(true);
            props.model.setAccessToken(accessToken);
        }

        function logoutACB() {
            setName("");
            props.model.setUserName(null);
            props.model.setLoggedIn(false);
            props.model.setAccessToken(null);
        }

        if (accessToken) {
            fetchUsername(accessToken).then(loginACB);
        }*/

        return <LoginView name={"test name"} />;
    }
);