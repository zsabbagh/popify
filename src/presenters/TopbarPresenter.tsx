import { observer } from 'mobx-react-lite';
import TopbarView from '../views/TopbarView';
import { Model } from '../interfaces';
import loginUrl from '../utils/spotifyAuthorization';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  model: Model;
  pages: string[];
  settings: string[];
}

export default observer(function Topbar(props: Props) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const navigate = useNavigate();
  const [cartItemRemoved, setCartItemRemoved] = React.useState(false);
  const [cartItemAdded, setCartItemAdded] = React.useState(false);
  const [cartSize, setCartSize] = React.useState(props?.model?.userState?.shoppingCart?.length || 0);
  const handleSearch = () => {
    navigate('/search?q=' + searchTerm);
  }
  const handleLoginLogout = () => {
    if (!!props.model.userState.user) {
        props.model.logoutUser();
    } else {
      console.log("path", window.location.pathname);
      
      localStorage.setItem('lastKnownPathBeforeLogin', window.location.pathname);
      window.location.href = loginUrl;
    }
  };

  const [cartOpen, setCartOpen] = React.useState(false);

  function updateShoppingCart(index: number) {
    console.log("removing item from cart", index)
    props.model.removeItemFromCart(index);
  }


  return (
    <TopbarView
      pages={props.pages}
      onCartRemoveItem={updateShoppingCart}
      onCartCheckout={() => undefined}
      shoppingCart={props.model.userState.shoppingCart}
      settings={props.settings}
      loggedIn={!!props.model.userState.user}
      loginUrl={loginUrl}
      onLoginLogout={handleLoginLogout}
      onSearchChange={(term: string) => setSearchTerm(term)}
      onSearch={handleSearch}
    />
  );
});
