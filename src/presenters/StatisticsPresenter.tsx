import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Model, ItemData } from '../interfaces';
import { computeTopGenres } from '../utils/tools';
import { get, set } from 'mobx';
import StatisticsView from '../views/StatisticsView';
import { UserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';
import { Suspense } from 'react';
import { getItemInformation } from '../utils/tools';


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

  /* returns the current item list based on locations */
  function getItemList(otherLocation?: string | undefined): Array<ItemData> | undefined {
    const tempLoc = otherLocation || location || undefined;
    let tempData: Array<any> | undefined = undefined;
    if (tempLoc === 'artists') {
      tempData = topData?.artists;
    } else if (tempLoc === 'tracks') {
        tempData = topData?.tracks;
    } else if (tempLoc === 'genres') {
        tempData = topGenres;
    } else {
      return undefined
    }
    tempData = tempData?.map((item: any, index: number) => getItemInformation(item, index));
    return tempData;
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
