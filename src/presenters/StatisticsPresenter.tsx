import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { fetchUsername } from '../spotifyFetcher';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { User, Model } from '../interfaces';
import { set } from 'mobx';
import StatisticsView from '../views/StatisticsView';
import { fetchTopItems } from '../spotifyFetcher';

interface TopData {
    artists: Array<any>,
    tracks: Array<any>,
}

export default observer(function Statistics(props: { model: Model }) {
  // this assumes that a UserModel is given...
  const navigate = useNavigate();
  useEffect(() => {
    if (!props.model.userAuthToken) {
      // navigate to login
      // TODO: add notification that you need to login
      navigate('/');
    }
  }, []);

  const accessToken = props.model.userAuthToken || '';
  const [topData, setTopData] = useState<TopData>({artists: [], tracks: []});
  const [limit, setLimit] = useState(5);
  const [timeRange, setTimeRange] = useState('short_term');
  const [timeRangeOpened, setTimeRangeOpened] = useState(false);
  const [location, setLocation] = useState('artists');
  const [topGenres, setTopGenres] = useState<Array<any>>([]);

  function calculateTopGenres() {
    const items = topData.artists;
    console.log('calculating genres from artists: ', items)
    if (!items) {
        return;
    }
    let genres = new Map<string, any>();
    for (const item of items) {
        console.log("processing item: ", item)
        const itemGenres = item?.genres || [];
        for (const genre of itemGenres) {
            console.log("processing genre: ", genre)
            if (genres.has(genre)) {
                genres.set(
                    genre,
                    genres.get(genre).popularity + 1
                );
            } else {
                genres.set(genre, {
                    id: genre?.id || genre,
                    type: 'genre',
                    name: genre,
                    popularity: 1,
                });
            }
        }
    }
    // get values from map
    const newGenres = Array
        .from(genres.values())
        .sort((a, b) => b.popularity - a.popularity);
    setTopGenres(newGenres);
    console.log("got genres: ", genres);
  }

  /* returns the current item list based on locations */
  function getItemList(otherLocation?: string | undefined) {
    const tempLoc = otherLocation || location || undefined;
    if (tempLoc === 'artists') {
      return topData.artists;
    } else if (tempLoc === 'tracks') {
        return topData.tracks;
    } else if (tempLoc === 'genres') {
        return topGenres;
    }
    return undefined
  }

  function updateTopData(newTopData: Array<any>) {
    setTopData({
        artists: location === 'artists' ? newTopData : topData.artists,
        tracks: location === 'tracks' ? newTopData : topData.tracks,
    });
  }

  useEffect(() => {
    calculateTopGenres();
  }, [topData]);

  // fetches new items and sets them
  async function fetchAndSetItems(limit: number, offset: number = 0, concat: boolean = false) {
    const items = getItemList();
    if (!items) {
        return;
    }
    console.log('fetching new items from location: ' + location)
    if (location === 'artists' || location === 'tracks') {
        console.log('fetching new items from location: ' + location)
        fetchTopItems(accessToken, location, limit, offset, timeRange)
            .then((newItems) => {
                if (concat) {
                    newItems = items.concat(newItems);
                }
                updateTopData(newItems);
            })
        console.log('items: ', items)
    }
  }

  /* when limit changes, only fetch necessary items */
  useEffect(() => {
    const items = getItemList();
    if (!items) {
        return;
    }
    if (limit > items.length) {
      // we only need to fetch more items if the limit
      // is higher than the number of items we already have
      const offset = items.length;
      const newLimit = limit - items.length;
      fetchAndSetItems(limit, offset, true);
    }
  }, [limit]);

  // when time range changes, fetch new items always
  useEffect(() => {
    const items = getItemList();
    fetchAndSetItems(limit);
    calculateTopGenres();
  }, [timeRange, location]);

  async function onItemSelectedACB(item: any) {
    // TODO: implement
    console.log('onItemSelected not implemented!', item);
  }

  async function onLocationChangeACB(newLocation: string) {
    console.log('location changed from, ', location, ' to ', newLocation);
    setLocation(newLocation);
  }

  if (!props?.model?.user) {
    // set location to login
    // redirect to login
    return <></>;
  }

  return (
    <StatisticsView
      location={location}
      onLocationChange={onLocationChangeACB}
      user={props.model.user}
      topItems={getItemList()?.slice(0, limit)}
      limit={limit}
      onLimitChange={(limit: number) => setLimit(limit)}
      timeRange={timeRange}
      onTimeRangeChange={(timeRange: string) => setTimeRange(timeRange)}
      onItemSelected={onItemSelectedACB}
    />
  );
});
