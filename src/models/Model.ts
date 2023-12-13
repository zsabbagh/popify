/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import { Model } from '../interfaces';
import { getOrRegisterUser } from '../utils/firebase';
import { fetchUser, fetchTopItems, fetchArtist } from '../utils/spotifyFetcher';

import { UserTopItems } from '../interfaces';

export default {
  pages: ['Search', 'Top', 'Recommendations'],
  userState: {
    userAuthToken: undefined,
    user: undefined,
    topItems: undefined,
    errorMessage: null,
  },
  /* fetch user's top artists and tracks */
  hasAuthToken() {
    return !!this.userState.userAuthToken;
  },
  getUserTopItems(timeRange: string | undefined) {
    if (!timeRange) {
      return undefined
    }
    if (timeRange === "short_term") {
      return this.userState.topItems?.shortTerm;
    } else if (timeRange === "mid_term") {
      return this.userState.topItems?.midTerm;
    } else if (timeRange === "long_term") {
      return this.userState.topItems?.longTerm;
    }
    return undefined;
  },
  setUserTopItems(timeRange: string, items: UserTopItems | undefined) {
    if (!items) {
      return false;
    } else if (timeRange === "short_term") {
      this.userState.topItems!.shortTerm = items;
    } else if (timeRange === "mid_term") {
      this.userState.topItems!.midTerm = items;
    } else if (timeRange === "long_term") {
      this.userState.topItems!.longTerm = items;
    } else {
      return false;
    }
    return true;
  },
  async updateUserTopItems(timeRange?: string) {
    if (!this.hasAuthToken() || ["short_term", "mid_term", "long_term"].indexOf(timeRange || '') === -1) {
      return;
    }
    const token = this.userState.userAuthToken as string;
    try {
      const timestamp = Date.now();
      const previousUpdate: number | undefined = this.getUserTopItems(timeRange)?.timestamp;
      if (previousUpdate && timestamp - previousUpdate < 60 * 10) {
        return;
      }
      const topArtists = await fetchTopItems(token, "artists", 50, timeRange);
      const topTracks = await fetchTopItems(token, "tracks", 50, timeRange);
      const topItems = {
        timestamp: timestamp,
        artists: topArtists.items,
        tracks: topTracks.items
      };
      this.setUserTopItems(timeRange!, topItems);
      this.userState.topItems!.latestUpdate = timestamp;
    } catch (error: any) {
      console.error("Error fetching top items", error);
      this.userState.errorMessage = error?.message;
    }
  },
  async loginUser(token?: string ) {
    
    if(!token){
      const cachedToken = localStorage.getItem('spotifyAuthToken');
      if(cachedToken) token = cachedToken;
      else return;
    }
    this.userState.userAuthToken = token;
    
    try {
      const user = await fetchUser(token);
      this.userState.user = user;   
      getOrRegisterUser(this.userState.user);     
    } catch (error: any) {
      console.error("Error loggin into spotify", error);
      if(error.status === 401){
        //Token expired
        this.logoutUser();
      };
      this.userState.errorMessage = error.message;
    }
    this.userState.topItems = {
      latestUpdate: 0,
      shortTerm: {
        timestamp: undefined,
        artists: [],
        tracks: [],
      },
      midTerm: {
        timestamp: undefined,
        artists: [],
        tracks: [],
      },
      longTerm: {
        timestamp: undefined,
        artists: [],
        tracks: [],
      },
    }
  },
  logoutUser() {
    localStorage.removeItem('spotifyAuthToken');
    this.userState.user = undefined;
    this.userState.userAuthToken = undefined;
  },
  artists: [],
  async addArtist(id: string){
    if(this.hasAuthToken()){
      try {
        const artist = await fetchArtist(this.userState.userAuthToken!, id);
        this.artists.push(artist);
      } catch (error) {
        //TODO handle
      }

    }
  }
} as Model;
