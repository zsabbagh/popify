import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Model } from '../interfaces';
import { computeTopGenres } from '../utils/tools';
import { get, set } from 'mobx';
import StatisticsView from '../views/StatisticsView';
import { SpotifyUserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';


export default observer(function Statistics(props: { model: Model }) {
  // this assumes that a UserModel is given...
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.model.userState.userAuthToken) {
      // navigate to login
      // TODO: add notification that you need to login
      navigate('/');
    }
  }, []);

  const user: User = props.model.userState.user || {} as User;
  const [limit, setLimit] = useState(5);
  const [timeRange, setTimeRange] = useState('short_term');
  const [location, setLocation] = useState('artists');
  const [topGenres, setTopGenres] = useState<Array<any>>([]);
  const [topData, setTopData] = useState<SpotifyUserTopItems>({
    timestamp: 0,
    artists: [] as Array<SpotifyArtist>,
    tracks: [] as Array<SpotifyTrack>,
  });

  function updateTopData(timeRange: string) {
    if (!user?.top) {
      return
    }
    if (timeRange === 'short_term') {
      setTopData(user?.top?.short_term);
    } else if (timeRange === 'mid_term') {
      setTopData(user?.top?.mid_term);
    } else if (timeRange === 'long_term') {
      setTopData(user?.top?.long_term);
    }
    setTopGenres(computeTopGenres(topData?.artists || []));
  }

  useEffect(() => {
    updateTopData(timeRange);
  }, []);

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

  // when time range changes, fetch new items always
  useEffect(() => {
    props.model.getUserTopItems(timeRange);
    updateTopData(timeRange);
  }, [timeRange]);

  async function onItemSelectedACB(item: any) {
    // TODO: implement
    console.log('onItemSelected not implemented!', item);
  }

  async function onLocationChangeACB(newLocation: string) {
    console.log('location changed from, ', location, ' to ', newLocation);
    setLocation(newLocation);
  }

  return (
    <StatisticsView
      location={location}
      onLocationChange={onLocationChangeACB}
      topItems={getItemList()?.slice(0, limit)}
      limit={limit}
      onLimitChange={(limit: number) => setLimit(limit)}
      timeRange={timeRange}
      onTimeRangeChange={(timeRange: string) => setTimeRange(timeRange)}
      onItemSelected={onItemSelectedACB}
    />
  );
});
