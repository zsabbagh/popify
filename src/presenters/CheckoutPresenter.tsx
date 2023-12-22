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
      
      if (response) {
        setRecommendations(response);
      }
    };
    getRecentPlaylist();
  }, []);

  const accessToken = userState.userAuthToken || '';
  const [recommendations, setRecommendations] = useState<SpotifyTrack[] | null>([]);
  const [userPlaylists, setUserPlaylists] = useState<{ name: string; id: string }[]>([]);

  const [attemptingExport, setAttemptingExport] = useState(false);
  const [attemptingGen, setAttemptingGen] = useState(false);
  const [successfulExport, setSuccessfulExport] = useState(false);
  const [successfulGen, setSuccessfulGen] = useState(false);
  const [failedExport, setFailedExport] = useState(false);
  const [failedGen, setFailedGen] = useState(false);

  const onExportACB = (newPlaylist: boolean, playlistIdentifier: string) => {
    if (!recommendations) return;
    setAttemptingExport(true);
    if (newPlaylist) {
      // create new playlist
      let id = userState?.user?.id;
      if (!id) {
        setAttemptingExport(false);
        return;
      }
      createPlaylist(accessToken, id, playlistIdentifier).then((playlistId) => {
        addTracksToPlaylist(
          accessToken,
          playlistId,
          recommendations.map((item) => item.uri)
        );
        setSuccessfulExport(true);
        setTimeout(() => {
          setSuccessfulExport(false);
          setAttemptingExport(false);
        }, 3000);
      }).catch((err) => {
        setAttemptingExport(false);
        setFailedExport(true);
        setTimeout(() => {
          setFailedExport(false);
        }, 3000);
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

  useEffect(() => {
    setAttemptingGen(false);
  }, [successfulGen, failedGen]);

  useEffect(() => {
    setAttemptingExport(false);
  }, [successfulExport, failedGen]);

  function getRecommendationsACB() {
    if (!userState?.shoppingCart) return;
    setAttemptingGen(true);
    const obj = getSeedsFromCart(userState.shoppingCart);
    fetchRecommendations(accessToken, numRecommendations, obj.artists, obj.tracks, obj.genres).then(
      (items) => {
        setRecommendations(items);
        props.model.putPlaylist(items);
        setSuccessfulGen(true);
        setTimeout(() => {
          setSuccessfulGen(false);
        }, 3000);
      }
    ).catch((err) => {
      props.model.onError(err);
      setAttemptingGen(false);
      setFailedGen(true);
      setTimeout(() => {
        setFailedGen(false);
      }, 3000);
    });
  }

  function getUserPlaylists() {
    try {
      fetchCurrentUserPlaylists(accessToken).then((playlists) => {
        setUserPlaylists(playlists);
      });
    }
    catch (error: any) {
      props.model.onError(error);
    }
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
      successfulExport={successfulExport}
      successfulGen={successfulGen}
      failedExport={failedExport}
      failedGen={failedGen}
      attemptingExport={attemptingExport}
      attemptingGen={attemptingGen}
    />
  );
});
