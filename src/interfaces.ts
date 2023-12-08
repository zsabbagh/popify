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
  userState: UserState;
  loginUser(userAuthToken?: string): void;
  logoutUser(): void;
  pages: string[];
}

interface UserState {
  userAuthToken?: string;
  user?: User;
  errorMessage: string | null;
}

export default UserState;
