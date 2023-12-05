interface UserModel {
    loggedIn: boolean;
    username: string | null;
    accessToken: string | null;

    setLoggedIn(loggedIn: boolean) : void;

    setUserName(username: string | null) : void;

    setAccessToken(accessToken: string | null) : void;
}

export default UserModel;