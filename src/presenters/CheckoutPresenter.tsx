import { observer } from 'mobx-react-lite';
import CheckoutView from '../views/CheckoutView';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  fetchRecommendations,
  fetchTopItems,
  createPlaylist,
  addTracksToPlaylist,
  fetchCurrentUserPlaylists,
} from '../utils/spotifyFetcher';
import { get, set } from 'mobx';
import { UserTopItems, SpotifyArtist, SpotifyTrack, SpotifyItem } from '../interfaces';

import UserState, { User, Model } from '../interfaces';
import { getSeedsFromCart } from '../utils/tools';

export default observer(function Checkout(props: { model: Model }) {
  // this assumes that a UserModel is given...

  const userState: UserState = props.model?.userState;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userState.userAuthToken) {
      // navigate to login
      // TODO: add notification that you need to login
      return navigate('/');
    }
    props.model.updateUserTopItems();

    const getRecentPlaylist = async () => {
      const response = await props.model.getMyRecentPlaylist();
      console.log(response);
      
      if (response) {
        setRecommendations(response);
      }
    };
    getRecentPlaylist();
  }, []);

  const accessToken = userState.userAuthToken || '';
  const [recommendations, setRecommendations] = useState<SpotifyTrack[] | null>([]);
  const [userPlaylists, setUserPlaylists] = useState<{ name: string; id: string }[]>([]);

  const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
    if (!recommendations) return;
    console.log('exporting', newPlaylist, playlistIdentifier);
    if (newPlaylist) {
      // create new playlist
      let id = userState?.user?.id;
      if (!id) {
        return;
      }
      createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
        addTracksToPlaylist(
          accessToken,
          playlistId,
          recommendations.map((item) => item.uri)
        );
      });
    } else {
      // add to existing playlist
      addTracksToPlaylist(
        accessToken,
        playlistIdentifier,
        recommendations.map((item) => item.uri)
      );
    }
  };

  const numRecommendations = 20; // TODO: make this a slider

  function getRecommendationsACB() {
    if (!userState?.shoppingCart) return;
    const obj = getSeedsFromCart(userState.shoppingCart);
    console.log(obj);
    fetchRecommendations(accessToken, numRecommendations, obj.artists, obj.tracks, obj.genres).then(
      (items) => {
        setRecommendations(items);
        props.model.putPlaylist(items);
      }
    );
  }

  function getUserPlaylists() {
    fetchCurrentUserPlaylists(accessToken).then((playlists) => {
      setUserPlaylists(playlists);
    });
  }

  // get seed artists
  // Fetch items on load
  function onLoadACB() {
    getUserPlaylists();
  }

  useEffect(onLoadACB, []);
  // useEffect(getRecommendationsACB, [seedArtists, seedTracks]); // update recommendations when seed artists or tracks change, too many requests

  return (
    <CheckoutView
      onRemoveItem={(index: number) => {
        props.model.removeItemFromCart(index);
      }}
      cartItems={userState?.shoppingCart || []}
      recommendations={recommendations}
      onGetRecommendations={getRecommendationsACB}
      onExport={onExportACB}
      userPlaylists={userPlaylists}
    />
  );
});
