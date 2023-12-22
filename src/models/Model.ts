/* 
   The Model keeps only abstract data and has no notions of graphics or interaction
*/

import { Model, SpotifyTrack, User } from '../interfaces';
import * as firebaseApi from '../utils/firebase';
import { fetchUser, fetchTopItems, fetchItem, isValidType } from '../utils/spotifyFetcher';

import { UserTopItems, ItemData } from '../interfaces';
import { getItemInformation } from '../utils/tools';

export default {
  pages: ['Search', 'Top'],
  userState: {
    userAuthToken: undefined,
    shoppingCart: undefined,
    user: undefined,
    topItems: undefined,
    errorMessage: null,
  },
  hasItemInCart(item: ItemData | undefined) {
    if (!item || !this.userState.shoppingCart) {
      return false;
    }
    return this.userState.shoppingCart.some((x) => x.id === item.id);
  },
  addItemToCart(item: ItemData | undefined) {
    if (!item) {
      return;
    }
    if (!this.userState.shoppingCart) {
      this.userState.shoppingCart = [];
    }
    if (this.hasItemInCart(item)) {
      return;
    }
    this.userState.shoppingCart.push(item);
    this.pushCartFirebase();
  },
  /* removes by ID or index */
  removeItemFromCart(itemOrIndex: number | string | undefined) {
    if (itemOrIndex === undefined) {
      return;
    }
    if (!this.userState.shoppingCart) {
      return;
    }
    if (typeof itemOrIndex === 'string') {
      const id = itemOrIndex;
      this.userState.shoppingCart = this.userState.shoppingCart.filter((x) => x.id !== id);
    } else if (typeof itemOrIndex === 'number') {
      const index = itemOrIndex;
      this.userState.shoppingCart = this.userState.shoppingCart.filter((x, i) => i !== index);
    }
    this.pushCartFirebase();
  },
  async pushCartFirebase() {
    console.log('pushing to firebase', this.userState.shoppingCart);

    firebaseApi.pushCartFirebase(this.userState.shoppingCart, this.userState.user);
  },
  async getCartFirebase() {
    return await firebaseApi.getCartFirebase(this.userState.user);
  },
  /* fetch user's top artists and tracks */
  hasAuthToken() {
    return !!this.userState.userAuthToken;
  },
  getUserTopItems(timeRange: string | undefined) {
    if (!timeRange) {
      return undefined;
    }
    if (timeRange === 'short_term') {
      return this.userState.topItems?.shortTerm;
    } else if (timeRange === 'medium_term') {
      return this.userState.topItems?.midTerm;
    } else if (timeRange === 'long_term') {
      return this.userState.topItems?.longTerm;
    }
    return undefined;
  },
  setUserTopItems(timeRange: string, items: UserTopItems | undefined) {
    if (!items) {
      return false;
    } else if (timeRange === 'short_term') {
      this.userState.topItems!.shortTerm = items;
    } else if (timeRange === 'medium_term') {
      this.userState.topItems!.midTerm = items;
    } else if (timeRange === 'long_term') {
      this.userState.topItems!.longTerm = items;
    } else {
      return false;
    }
    return true;
  },
  async updateUserTopItems(timeRange?: string) {
    if (!this.hasAuthToken() || ['short_term', 'medium_term', 'long_term'].indexOf(timeRange || '') === -1) {
      return;
    }
    const token = this.userState.userAuthToken as string;
    try {
      const timestamp = Date.now();
      const previousUpdate: number | undefined = this.getUserTopItems(timeRange)?.timestamp;
      if (previousUpdate && timestamp - previousUpdate < 60 * 10) {
        return;
      }
      const topArtists = await fetchTopItems(token, 'artists', 50, timeRange);
      const topTracks = await fetchTopItems(token, 'tracks', 50, timeRange);
      const topItems = {
        timestamp: timestamp,
        artists: topArtists.items,
        tracks: topTracks.items,
      };
      this.setUserTopItems(timeRange!, topItems);
      this.userState.topItems!.latestUpdate = timestamp;
    } catch (error: any) {
      localStorage.removeItem('spotifyAuthToken');
      this.logoutUser();
      console.error('Error fetching top items', error);
      this.userState.errorMessage = error?.message;
    }
  },
  async loginUser(token?: string) {
    if (!token) {
      const cachedToken = localStorage.getItem('spotifyAuthToken');
      if (cachedToken) token = cachedToken;
      else return;
    }
    this.userState.userAuthToken = token;

    try {
      const user = await fetchUser(token);
      this.userState.user = user;
      firebaseApi.getOrRegisterUser(this.userState.user);
    } catch (error: any) {
      console.error('Error loggin into spotify', error);
      if (error.status === 401) {
        //Token expired        
        localStorage.removeItem('spotifyAuthToken');
        this.logoutUser();
      }
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
    };
    this.userState.shoppingCart = await this.getCartFirebase();
  },
  logoutUser() {
    localStorage.removeItem('spotifyAuthToken');
    this.userState.user = undefined;
    this.userState.userAuthToken = undefined;
    window.location.reload();
  },
  items: [],
  async addItem(id: string, type: string) {
    // expects a valid type
    if (!isValidType(type)) {
      return null;
    }

    if (this.hasAuthToken()) {
      try {
        const data: any = await fetchItem(this.userState.userAuthToken!, id, type);
        const item: ItemData | undefined = getItemInformation(data);
        if (!item) {
          throw new Error('Invalid item');
        }
        this.items.push(item);
      } catch (error: any) {
        if (error.status === 401) {
          //Token expired        
          localStorage.removeItem('spotifyAuthToken');
          this.logoutUser();
        }
        this.userState.errorMessage = error.message;
      }
    }
  },
  async submitRating(uri: string, rating: number) {
    return await firebaseApi.putRating(uri, rating, this.userState.user!);
  },
  async getRating(uri: string) {
    return await firebaseApi.getRating(uri, this.userState.user!);
  },

  async getAverageRating(uri: string) {
    return await firebaseApi.getAverageRating(uri);
  },
  async getComments(uri: string) {
    const response = await firebaseApi.getComments(uri);
    return response;
  },
  async postComment(uri: string, content: string, title: string) {
    return await firebaseApi.postComment(uri, this.userState.user!, content, title);
  },
  async getUser(userId: string) {
    return await firebaseApi.getUser(userId);
  },
  async putPlaylist(playlist: SpotifyTrack[]) {
    return await firebaseApi.putPlaylist(playlist, this.userState.user?.id);
  },

  async getPlaylists(userId: string) {
    return await firebaseApi.getPlaylists(userId);
  },
  async getMyRecentPlaylist() {
    const response = await firebaseApi.getPlaylists(this.userState.user?.id || '');
    console.log(response);
    
    if (response.length > 0) {
      return response[0];
    }
    return null;
  },
} as Model;
