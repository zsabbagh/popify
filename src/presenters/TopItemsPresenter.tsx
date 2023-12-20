import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Model, ItemData } from '../interfaces';
import { computeTopGenres } from '../utils/tools';
import { get, set } from 'mobx';
import CardsView from '../views/CardsView';
import { UserTopItems, SpotifyArtist, SpotifyTrack } from '../interfaces';
import { Suspense } from 'react';
import { getItemInformation } from '../utils/tools';


export default observer(function Statistics(props: { model: Model }) {
  // this assumes that a UserModel is given...
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState('short_term');
  const [currentItemType, setCurrentItemType] = useState('artists');
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

  /* returns the current item list based on currentItemType */
  function getItemList(otherType?: string | undefined): Array<ItemData> | undefined {
    const tempLoc = otherType || currentItemType || undefined;
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

  async function onItemTypeChangeACB(newType: string) {
    console.log('location changed from, ', location, ' to ', newType);
    setCurrentItemType(newType);
  }

  const [currentPage, setCurrentPage] = useState(1);

  function onAddItemToCartACB(item: ItemData) {
    props.model.addItemToCart(item);
  }

  function onRemoveItemFromCartACB(id: string) {
    props.model.removeItemFromCart(id);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CardsView
        currentItemType={currentItemType}
        itemsInCart={itemsInCart}
        itemTypes={['artists', 'tracks', 'genres']}
        onAddItemToCart={onAddItemToCartACB}
        onRemoveItemFromCart={onRemoveItemFromCartACB}
        onItemTypeChange={onItemTypeChangeACB}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        items={getItemList()}
      />
    </Suspense>
  );
});
