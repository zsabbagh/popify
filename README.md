# Popify

https://popify.se/

## Information of usage

To access the application, it is required to request access
from any of us developing it.
Currently, the application is in "development" phase with regards to Spotify,
so one might only add a user to the app manually.
As such, the email associated with the Spotify account is needed.

## Short description of your project


The app builds on the Spotify API and gives insights into one's most popular artists and genres. 
It also enables playlist generation by enabling users to add up to five items (e.g. artists, albums, tracks, or genres) to a shopping cart, then from the selected items generating a recommended playlist.
Since recommendations is possible in Spotify, the difference here is that it enables more granular and quick selection to generate recommendations from.

## Project file structure

```
src
├── config.tsx ................. all necessary config constants (ignored)
├── handlers ................... response handlers
│   └── SpotifyResponseHandler.tsx ... handles Spotify authentication response
├── index.css
├── index.tsx .................. index file
├── interfaces.ts .............. interfaces, i.e. type definitions for Typescript
├── models
│   └── Model.ts ............... the main model, i.e. its definition
├── presenters
│   ├── CheckoutPresenter.tsx .. presenter for the checkout page
│   ├── IndexPresenter.tsx ..... presenter for the Index page
│   ├── ItemPagePresenter.tsx .. a generic item page presenter, see ItemData type
│   ├── OnLoadPresenter.tsx .... on load presenter
│   ├── Router.tsx ............. the router
│   ├── SearchPresenter.tsx .... search presenter
│   ├── TopItemsPresenter.tsx .. top items presenter
│   ├── TopbarPresenter.tsx .... the top bar presenter
│   └── UserPresenter.tsx ...... user presenter
├── react-app-env.d.ts
├── utils
│   ├── firebase.ts ............ all firebase utilities
│   ├── spotifyAuthorization.ts ... Spotify authorisation utilities
│   ├── spotifyFetcher.ts ...... Spotify API fetchers
│   └── tools.ts ............... other utility/tool functions
└── views
    ├── CardsView.tsx .......... presents a paginated cards view of ItemData
    ├── CheckoutView.tsx ....... the checkout view
    ├── CommentView.tsx ........ views the comments
    ├── ExportDialogView.tsx ... export dialog for exporting playlists
    ├── IndexView.tsx .......... the index view
    ├── ItemCardView.tsx ....... a specific card presenting an ItemData, used in CardsView
    ├── ItemDetailsView.tsx .... renders details of a certain ItemData object, used in ItemCardView and ItemDialogView
    ├── ItemDialogView.tsx ..... is viewed when an ItemCard is clicked in the CardsView
    ├── ItemPageView.tsx ....... the generic page view for an ItemData
    ├── LoaderView.tsx ......... a simple loader view used in the project
    ├── MenuDrawerView.tsx ..... a drawer that is viewed from TopbarView when screen size is small
    ├── OnLoadView.tsx ......... on load view (animation)
    ├── RatingView.tsx ......... views rating for an ItemData
    ├── ShoppingCartView.tsx ... the shopping cart
    ├── TimeRangeView.tsx ...... time range selection view, used in TopItemsPresenter
    ├── TopbarView.tsx ......... the topbar
    └── UserView.tsx ........... user view
```


/src/config.ts needs to have the following configuration:
export const spotifyClientId = 'spotifyIdHere';
export const firebaseConfig = {
  apiKey: 'REDACTED',
  authDomain: 'REDACTED',
  projectId: 'REDACTED',
  storageBucket: 'REDACTED',
  messagingSenderId: 'REDACTED,
  appId: 'REDACTED',
  measurementId: 'REDACTED',
};


## Available Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
