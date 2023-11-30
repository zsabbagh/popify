// function to fetch username from spotify api
function fetchUsername(accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` };
  return fetch("https://api.spotify.com/v1/me", { headers })
    .then((res) => res.json())
    .then((data) => data.display_name);
}

export {fetchUsername};