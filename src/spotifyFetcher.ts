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


export {fetchUsername, fetchUser};