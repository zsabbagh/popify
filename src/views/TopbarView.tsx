import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
} from '@mui/material';
import { Form, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import ShoppingCart from '../components/ShoppingCart';
import { ItemData } from '../interfaces';

function TopbarView(props: {
  pages: string[];
  shoppingCart: ItemData[] | undefined;
  cartOpen: boolean;
  onCartClicked: () => void;
  onCartClosed: () => void;
  onCartRemoveItem: (index: number) => void;
  onCartCheckout: () => void;
  settings: string[];
  loggedIn: boolean;
  loginUrl: string;
  handleLoginLogout: Function;
  onSearchChange: Function;
  onSearch: Function;
}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleLoginLogout = () => {
    props.handleLoginLogout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Box sx={{ display: 'flex', flexDirection: 'row', bottom: '0' }}>
              <img src="/logo.svg" alt="logo" style={{ height: '50px', width: 'auto' }}/>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  position: 'relative',
                  marginTop: '7px',
                  marginLeft: '10px',
                }}
              >
                Popify
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {props.pages.map((page) => (
              <Link
                key={page}
                to={'/' + page.toLowerCase()} // Update to attribute to 'to' for React Router
              >
                <Button sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>{page}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <TextField
              label="Search"
              id="outlined-size-small"
              defaultValue=""
              size="small"
              variant="filled"
              sx={{
                input: {
                  color: 'black',
                  background: 'white',
                },
              }}
              onChange={(e) => {
                props.onSearchChange(e.target.value);
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  props.onSearch();
                }
              }}
            />
          </Box>
          {
            props.loggedIn ? (
              <ShoppingCart 
                items={props.shoppingCart || []}
                open={props.cartOpen}
                onClicked={props.onCartClicked}
                onClosed={props.onCartClosed}
                onRemoveItem={props.onCartRemoveItem}
                onCheckout={props.onCartCheckout}
              />
            ) : <></>
          }
          <Button key="login" onClick={handleLoginLogout} sx={{ my: 2, color: 'white', display: 'block' }}>
            {props.loggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopbarView;
