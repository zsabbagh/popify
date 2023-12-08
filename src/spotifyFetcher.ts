// function to fetch username from spotify api
function fetchUsername(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch("https://api.spotify.com/v1/me", { headers })
    .then((res) => res.json())
    .then((data) => {
      console.log("User", data);
      
      return data.display_name});
}

// function to fetch username from spotify api
function fetchUser(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch("https://api.spotify.com/v1/me", { headers })
    .then((res) => res.json())
    .then((data) => {      
      return data});
}


// function to fetch top tracks from spotify api
function fetchTopItems(accessToken: string,
            type: string = "artists", 
            limit: number = 5,
            offset: number = 0,
            timeRange: string = "short_term") {
  if (type !== "artists" && type !== "tracks") {
    throw new Error("Invalid type! Expected 'artists' or 'tracks'");
  }
  const endpoint = `https://api.spotify.com/v1/me/top/${type}?limit=${limit}&offset=${offset}&time_range=${timeRange}`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch(endpoint, { headers })
    .then((res) => res.json())
    .then((data) => data.items);
}

export {fetchUsername, fetchUser, fetchTopItems};
