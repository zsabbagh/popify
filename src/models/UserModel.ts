//import UserModel from "../interfaces";

export default {
    loggedIn: false as boolean,
    username: null as string | null,
    accessToken: null as string | null,

    setLoggedIn(loggedIn: boolean): void {
        this.loggedIn = loggedIn;
    },

    setUserName(username: string) : void {
        this.username = username;
    },

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    },
}