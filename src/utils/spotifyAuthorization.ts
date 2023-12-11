const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'c3cf6e3ce94d45a49e7dc365c55fa68e';
let redirectUri = 'http://localhost:3000/spotifyResponse'; //Dev uri

if (process.env.NODE_ENV === 'production') {
  redirectUri = 'https://popify.se/spotifyResponse';
}

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
];

const loginUrl = `${authEndpoint}
?client_id=${clientId}
&redirect_uri=${redirectUri}
&scope=${scopes.join('%20')}
&response_type=token
&show_dialog=true`;

export default loginUrl;
