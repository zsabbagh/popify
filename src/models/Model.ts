/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import { Model } from '../interfaces';
import { fetchUser } from '../spotifyFetcher';

export default {
  userState: {
    userAuthToken: undefined,
    user: undefined,
    errorMessage: null,

  },
  async loginUser(token?: string ) {
    console.log("Started login");
    
    if(!token){
      const cachedToken = localStorage.getItem('spotifyAuthToken');
      if(cachedToken) token = cachedToken;
      else return;
    }
    this.userState.userAuthToken = token;
    console.log("Token", token);
    
    try {
      const user = await fetchUser(token);
      this.userState.user = user;        
    } catch (error: any) {
      console.error("Error loggin into spotify", error);
      if(error.status === 401){
        //Token expired
        this.logoutUser();
      };
      this.userState.errorMessage = error.message;
    }
  },
  logoutUser() {
    localStorage.removeItem('spotifyAuthToken');
    this.userState.user = undefined;
    this.userState.userAuthToken = undefined;
  },
  pages: ['Statistics', 'Quiz'],
} as Model;
