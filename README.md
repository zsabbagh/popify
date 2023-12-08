# Popify

https://popify.se/

## Short description of your project

The app builds on the Spotify API and gives statistical 
insights into one’s most popular artists and genres. 
Should be able to choose how many of the Top items are 
presented. Similarly, the app should be able to present 
such statistics for specific playlists. More specifically, 
it should summarize all artists, genres, etc. This is 
useful for large playlists. Search recommendations based 
on relevant sliders and artist/genre seeds, or given a 
specific playlist. Furthermore, it will be able to generate 
quizzes given an artist, album, genre, or playlist.

## What is done

    - Spotify authentication
    - Fetch user from API
    - Topbar
    - Working router
    - Deployed
    - Statistics presenter/view
    - Persist user authentication through refresh
    - Fetch top items from Spotify API

## What is planned to be done

    - Recommendation page: recommendations based on the users listens
    - Statistics page: improve it and build upon it
    - Quiz pages: quiz creation etc
    - Firebase integration

## Project file structure

```
> models
    Model.ts - the main model
> handlers
    SpotifyResponseHandler.tsx - handles Spotify responses
> presenters
    OnLoadPresenter.tsx - Handles an animation when site first loads
    LoginPresenter.tsx - login
    QuizResultsPresenter.tsx - winners and such
    QuizzesPresenter.tsx - frontpage and selection
    QuizzingPresenter.tsx - handling quizzes
    RecommendationPresenter.tsx - recommendations
    Router.tsx - the router
    StatisticsPresenter.tsx - handling statistics (top items)
    TopbarPresenter.tsx - topbar selection
> utils
    spotifyAuthorization.ts - handles authorisation to Spotify
    spotifyFetcher.ts - fetches data from Spotify's Web API
    tools.ts - includes various tools (for now computations of genres)
> views
    OnLoadView.tsx - Displays animation
    LoginView.tsx - displays login
    QuizResultsView.tsx - displaying winners and such
    QuizzesView.tsx - frontpage and selection
    QuizzingView.tsx - displaying the playing
    RecommendationView.tsx - displays recommendations
    StatisticsView.tsx - presenting statistics
    TopbarView.tsx - topbar display
index.css
interfaces.ts - type definitions for Typescript support
react-app-env.d.ts 
```

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
