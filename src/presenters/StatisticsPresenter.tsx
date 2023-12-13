import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Model } from '../interfaces';
import { computeTopGenres } from '../utils/tools';
import { get, set } from 'mobx';
import StatisticsView from '../views/StatisticsView';
import { UserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';
import { Suspense } from 'react';


export default observer(function Statistics(props: { model: Model }) {
  // this assumes that a UserModel is given...
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState('short_term');
  const [location, setLocation] = useState('artists');
  const [topGenres, setTopGenres] = useState<Array<any> | undefined>(undefined);
  const [topData, setTopData] = useState<UserTopItems | undefined>(undefined);

  function updateTopData() {
    if (!props.model?.userState?.userAuthToken) {
      return
    }
    setTopData(props.model.getUserTopItems(timeRange));
    setTopGenres(computeTopGenres(topData?.artists || []));
  }

  function onLoadACB() {
    if (!props.model.getUserTopItems(timeRange)) {
      props.model.updateUserTopItems(timeRange);
    }
    updateTopData();
  }

  useEffect(onLoadACB, [])
  useEffect(onLoadACB, [props?.model?.userState?.topItems?.latestUpdate])

  useEffect(() => {
    if (!props.model.userState.userAuthToken) {
      // navigate to login
      // TODO: add notification that you need to login
      navigate('/');
    }
    props.model.updateUserTopItems(timeRange);
    updateTopData();
  }, [props?.model?.userState, timeRange]);

  useEffect(() => {
    updateTopData();
  }, [topData])

  console.log("-> GOT top data")
  console.log(topData)

  /* returns the current item list based on locations */
  function getItemList(otherLocation?: string | undefined) {
    const tempLoc = otherLocation || location || undefined;
    if (tempLoc === 'artists') {
      return topData?.artists;
    } else if (tempLoc === 'tracks') {
        return topData?.tracks;
    } else if (tempLoc === 'genres') {
        return topGenres;
    }
    return undefined
  }

  async function onItemSelectedACB(item: any) {
    // TODO: implement
    console.log('onItemSelected not implemented!', item);
  }

  async function onLocationChangeACB(newLocation: string) {
    console.log('location changed from, ', location, ' to ', newLocation);
    setLocation(newLocation);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatisticsView
        location={location}
        onLocationChange={onLocationChangeACB}
        topItems={getItemList()}
        timeRange={timeRange}
        onTimeRangeChange={(timeRange: string) => setTimeRange(timeRange)}
        onItemSelected={onItemSelectedACB}
      />
    </Suspense>
  );
});
