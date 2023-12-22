import { Avatar, Paper } from "@mui/material";
import { SpotifyTrack, User } from "../interfaces";

interface Props{
  playlists: SpotifyTrack[][];
  user: User
}

export default
function UserView(props: Props) {
  const user = props.user;
  console.log("playlist", props.playlists);
  
  return (
    <div style={{textAlign: "center"}}>
      <div style={{width: "100%", marginTop: "20px"}}>
        <img style={{borderRadius: "50%", width: "250px"}} src={user.images[user.images.length - 1].url}></img>
      </div>
      <h1>{user.display_name}</h1>

      <Paper style={{display: "flex", flexDirection: "row"}} elevation={2}>
        

      </Paper>
    </div>
  );
};
