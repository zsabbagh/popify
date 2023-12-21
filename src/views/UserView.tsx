import { User } from "../interfaces";

export default
function UserView(props: {user: User}) {
  const user = props.user;
  return (
    <div style={{textAlign: "center"}}>
      <div style={{width: "100%", marginTop: "20px"}}>
        <img style={{borderRadius: "50%", width: "250px"}} src={user.images[user.images.length - 1].url}></img>
      </div>
      <h1>{user.display_name}</h1>
    </div>
  );
};
