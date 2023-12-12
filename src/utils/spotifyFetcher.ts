// function to fetch username from spotify api
function fetchUsername(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch('https://api.spotify.com/v1/me', { headers })
    .then((res) => res.json())
    .then((data) => {
      console.log('User', data);

      return data.display_name;
    });
}

// function to fetch username from spotify api
function fetchUser(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch('https://api.spotify.com/v1/me', { headers })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else if(res.status === 401){
        throw new Error("Auth token expired");
      } else {
        throw new Error("An error has occured");
      }
    })
    .then((data) => {
      return {
        ...data,
        top: {}
      }
    });
}

// function to fetch top tracks from spotify api
function fetchTopItems(accessToken: string,
            type: string = "artists", 
            limit: number = 50,
            timeRange: string = "short_term") {
  if (type !== "artists" && type !== "tracks") {
    throw new Error("Invalid type! Expected 'artists' or 'tracks'");
  }
  const endpoint = `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=${limit}`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(endpoint, { headers })
    .then((res) => res.json());
}

function fetchRecommendations(accessToken: string,
    limit: number = 5,
    seedArtists: string[] = [],
    seedTracks: string[] = [],
    seedGenres: string[] = []) {
      let endpoint = `https://api.spotify.com/v1/recommendations?limit=${limit}`;

      if (seedArtists.length > 0) {
        endpoint = endpoint.concat(`&seed_artists=${seedArtists.join(",")}`);
      }
      if (seedTracks.length > 0) {
        endpoint = endpoint.concat(`&seed_tracks=${seedTracks.join(",")}`);
      }
      if (seedGenres.length > 0) {
        endpoint = endpoint.concat(`&seed_genres=${seedGenres.join(",")}`);
      }

      const headers = { Authorization: `Bearer ${accessToken}` };
      return fetch(endpoint, { headers })
        .then((res) => res.json())
        .then((data) => data.tracks);
    }

function createPlaylist(accessToken: string, userId: string, playlistName: string) {
  const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(endpoint, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: playlistName
    })
  })
    .then((res) => res.json())
    .then((data) => data.id);
}

function addTracksToPlaylist(accessToken: string, playlistId: string, trackUris: string[]) {
  const endpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(endpoint, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uris: trackUris
    })
  })
    .then((res) => res.json());
}

function fetchCurrentUserPlaylists(accessToken: string) {
  const endpoint = `https://api.spotify.com/v1/me/playlists`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(endpoint, { headers })
    .then((res) => res.json())
    .then((data) => data.items);

}

export {fetchUsername, fetchUser, fetchTopItems, fetchRecommendations, createPlaylist, addTracksToPlaylist, fetchCurrentUserPlaylists};