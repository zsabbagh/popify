import { Timestamp } from "firebase/firestore";

export interface ItemData {
  id: string;
  name: string;
  type: string;
  uri: string;
  image: string;
  popularity?: number;
  album?: string;
  artists?: Array<ItemData>;
  index?: number;
  genres?: Array<string>;
}
export interface SpotifyImage {
  url: string;
  width: number;
  height: number;
}

export interface SpotifyItem {
  id: string;
  name: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  type: string;
  uri: string;
}

export interface SpotifyArtist extends SpotifyItem {
  genres: string[];
  images: SpotifyImage[];
  popularity: number;
}

export interface SpotifyTrack extends SpotifyItem {
  artists: SpotifyArtist[];
  album: {
    id: string;
    name: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    images: SpotifyImage[];
  };
  popularity: number;
}

export interface SpotifyAlbum extends SpotifyItem {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  release_date: string;
  release_date_precision: string;
  artists: SpotifyArtist[];
  images: SpotifyImage[];
  tracks: {
    items: SpotifyTrack[];
  };
}
export interface playlistObject {
  playlist: SpotifyTrack[];
  userId: string;
  timestamp: Timestamp;
}


export interface User {
  id: string;
  display_name: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  images: SpotifyImage[];
}

export interface UserTopItems {
    timestamp: number | undefined;
    artists: Array<SpotifyArtist>,
    tracks: Array<SpotifyTrack>,
}

export interface Comment{
  title: string;
  content: string;
  uri: string;
  user_name: string;
  user_id: string;
  user_image: string;
  timestamp: Timestamp
}

export interface Model {
  userState: UserState;
  getUserTopItems(timeRange: string | undefined): UserTopItems | undefined;
  setUserTopItems(timeRange: string, items: UserTopItems | undefined): boolean;
  removeItemFromCart(item: ItemData | string | number | undefined): void;
  addItemToCart(item: ItemData): void;
  hasItemInCart(item: ItemData | undefined): boolean;
  updateUserTopItems(timeRange?: string): void;
  hasAuthToken(): boolean;
  loginUser(userAuthToken?: string): void;
  logoutUser(): void;
  addItem(id: string, type: string): void;
  submitRating(uri: string, rating: number): Promise<void>;
  getRating(uri: string): Promise<number>;
  getAverageRating(uri: string): Promise<{count: number, average: number}>;
  postComment(uri: string, content: string, title: string): Promise<Comment | null>;
  getComments(uri: string): Promise<Comment[]>;
  getUser(userId?: string): Promise<User | undefined>;
  getCartFirebase(): Promise<ItemData[]>;
  pushCartFirebase(): void;
  putPlaylist(playlist: SpotifyTrack[]): Promise<playlistObject>;
  getPlaylists(userId: string): Promise<SpotifyTrack[][]>;
  getMyRecentPlaylist(): Promise<SpotifyTrack[] | null>
  items: ItemData[];
  pages: string[];

}

interface UserState {
  userAuthToken?: string;
  shoppingCart?: Array<ItemData>;
  user?: User;
  errorMessage: string | null;
  topItems?: {
    latestUpdate: number;
    shortTerm: UserTopItems;
    midTerm: UserTopItems;
    longTerm: UserTopItems;
  };
}

export default UserState;
