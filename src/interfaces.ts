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

export interface SpotifyUserTopItems {
    timestamp: string | number | undefined;
    artists: Array<SpotifyArtist>,
    tracks: Array<SpotifyTrack>,
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
  top: {
    short_term: SpotifyUserTopItems;
    mid_term: SpotifyUserTopItems;
    long_term: SpotifyUserTopItems;
  };
}

export interface Model {
  userState: UserState;
  getUserTopItems(userAuthToken?: string, timeRange?: string): void;
  hasAuthToken(): boolean;
  loginUser(userAuthToken?: string): void;
  logoutUser(): void;
  addArtist(id: string): void;
  artists: SpotifyArtist[];
  pages: string[];
}

interface UserState {
  userAuthToken?: string;
  user?: User;
  errorMessage: string | null;
}

export default UserState;
