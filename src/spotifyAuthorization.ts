import { spotifyClientId } from "./config";

const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "c3cf6e3ce94d45a49e7dc365c55fa68e";
const redirectUri = "http://localhost:3000/spotifyResponse";


const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

const loginUrl = `${authEndpoint}
?client_id=${spotifyClientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`;

export default loginUrl;