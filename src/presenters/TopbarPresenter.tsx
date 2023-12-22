import { observer } from 'mobx-react-lite';
import TopbarView from '../views/TopbarView';
import { Model } from '../interfaces';
import loginUrl from '../utils/spotifyAuthorization';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  model: Model;
  pages: string[];
  settings: string[];
}

export default observer(function Topbar(props: Props) {
  const [searchTerm, setSearchTerm] = React.useState('');

  const [shoppingCart, setShoppingCart] = React.useState(props.model.userState.shoppingCart);

  const navigate = useNavigate();
  const handleLoginLogout = () => {
    if (!!props.model.userState.user) {
        props.model.logoutUser();
    } else {
      console.log("path", window.location.pathname);
      
      localStorage.setItem('lastKnownPathBeforeLogin', window.location.pathname);
      window.location.href = loginUrl;
    }
  };

  useEffect(() => {
    setShoppingCart(props.model.userState.shoppingCart);
  }, [props.model.userState.shoppingCart?.length])
  
  const onCartCheckout = () => {
    navigate('/checkout');
  }

  function updateShoppingCart(index: number) {
    console.log("removing item from cart", index)
    props.model.removeItemFromCart(index);
  }

  const [isPortrait, setIsPortrait] = React.useState(window.innerWidth < 600);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      setIsPortrait(false);
    } else {
      setIsPortrait(true);
    }
  });

  return (
    <TopbarView
      isPortrait={isPortrait}
      pages={props.pages}
      onCartRemoveItem={updateShoppingCart}
      onCartCheckout={onCartCheckout}
      shoppingCart={shoppingCart}
      settings={props.settings}
      loggedIn={!!props.model.userState.user}
      loginUrl={loginUrl}
      onLoginLogout={handleLoginLogout}
      user={props.model.userState.user}
    />
  );
});
