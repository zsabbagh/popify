import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Model, ItemData } from '../interfaces';
import { computeTopGenres } from '../utils/tools';
import { get, set } from 'mobx';
import TimeRangeView from "../views/TimeRangeView";
import CardsView from '../views/CardsView';
import { UserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';
import { Suspense } from 'react';
import { getItemInformation, itemMatchesQuery } from '../utils/tools';


export default observer(function Statistics(props: { model: Model }) {
  // this assumes that a UserModel is given...
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState('short_term');
  const [tab, setTab] = useState('artists');
  const [topGenres, setTopGenres] = useState<Array<any> | undefined>(undefined);
  const [topData, setTopData] = useState<UserTopItems | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

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

  const [itemsInCart, setItemsInCart] = useState<Array<string>>([]);

  useEffect(onLoadACB, [])
  useEffect(onLoadACB, [props?.model?.userState?.topItems?.latestUpdate])

  useEffect(() => {
    if (!props.model.userState.shoppingCart) {
      return;
    }
    setItemsInCart(props.model.userState.shoppingCart.map((item: ItemData) => item.id));
  }, [props?.model?.userState?.shoppingCart?.length])

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

  /* returns the current item list based on tab */
  function getItemList(): Array<ItemData> | undefined {
    let tempData: Array<any> | undefined = undefined;
    if (tab === 'artists') {
      tempData = topData?.artists;
    } else if (tab === 'tracks') {
        tempData = topData?.tracks;
    } else if (tab === 'genres') {
        tempData = topGenres;
    } else {
      return undefined
    }
    tempData = tempData?.map((item: any, index: number) => getItemInformation(item, index));
    if (searchQuery) {
      tempData = tempData?.filter((item: any) => itemMatchesQuery(item, searchQuery));
    }
    return tempData;
  }

  async function onTabChangeACB(newType: string) {
    console.log('location changed from, ', location, ' to ', newType);
    setTab(newType);
  }

  function onAddItemToCartACB(item: ItemData) {
    props.model.addItemToCart(item);
  }

  function onRemoveItemFromCartACB(id: string) {
    props.model.removeItemFromCart(id);
  }

  const items = getItemList();

  return (
      <div>
        <TimeRangeView
          timeRange={timeRange}
          timeRanges={['short_term', 'medium_term', 'long_term']}
          onTimeRangeChange={(query: string) => setTimeRange(query)}
        />
        <CardsView
          tab={tab}
          itemsInCart={itemsInCart}
          tabs={['artists', 'tracks', 'genres']}
          onAddItemToCart={onAddItemToCartACB}
          onRemoveItemFromCart={onRemoveItemFromCartACB}
          onTabChange={onTabChangeACB}
          items={getItemList()}
          onSearchChange={(query: string) => setSearchQuery(query)}
        />
      </div>
  );
});