const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "fe87968fdf7444beb2212a7e1bace2b6";
const redirectUri = "http://localhost:3000/spotifyResponse";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

const loginUrl = `${authEndpoint}
?client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join("%20")}
&response_type=token
&show_dialog=true`;

export default loginUrl;