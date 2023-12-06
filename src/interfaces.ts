export interface SpotifyImage {
  url: string;
  width: number;
  height: number;
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


export interface Model {
  userAuthToken?: string;
  user?: User;
}