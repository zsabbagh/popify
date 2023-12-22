import { Avatar } from "@mui/material";
import { User } from "../interfaces";

export default
function UserView(props: {user: User}) {
  const user = props.user;
  return (
    <div style={{textAlign: "center"}}>
      <div style={{width: "100%", marginTop: "20px", display: "flex", alignContent: "center", justifyContent: "center"}}>
        <Avatar style={{borderRadius: "50%", width: "250px", height: "250px"}} src={user.images[user.images.length - 1].url}></Avatar>
      </div>
      <h1>{user.display_name}</h1>
    </div>
  );
};
