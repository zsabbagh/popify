/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import { Model } from '../interfaces';
import { fetchUser, fetchTopItems } from '../utils/spotifyFetcher';

export default {
  userState: {
    userAuthToken: undefined,
    user: undefined,
    errorMessage: null,
  },
  /* fetch user's top artists and tracks */
  hasAuthToken() {
    return !!this.userState.userAuthToken;
  },
  async getUserTopItems(timeRange?: string) {
    if (!this?.userState?.user || !this.hasAuthToken() || ["short_term", "mid_term", "long_term"].indexOf(timeRange || '') === -1) {
      return;
    }
    const token = this.userState.userAuthToken as string;
    try {
      const topArtists = await fetchTopItems(token, "artists", 50, timeRange);
      const topTracks = await fetchTopItems(token, "tracks", 50, timeRange);
      const topItems = {
        timestamp: Date.now(),
        artists: topArtists.items,
        tracks: topTracks.items
      };
      if (timeRange === "short_term") {
        this.userState.user.top.short_term = topItems;
      } else if (timeRange === "mid_term") {
        this.userState.user.top.mid_term = topItems;
      } else if (timeRange === "long_term") {
        this.userState.user.top.long_term = topItems;
      }
    } catch (error: any) {
      console.error("Error fetching top items", error);
      this.userState.errorMessage = error?.message;
    }
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
    this.getUserTopItems(token, "short_term");
  },
  logoutUser() {
    localStorage.removeItem('spotifyAuthToken');
    this.userState.user = undefined;
    this.userState.userAuthToken = undefined;
  },
  pages: ['Statistics', 'Quiz', 'Recommendations'],
} as Model;
