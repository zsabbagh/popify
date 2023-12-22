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
import ShoppingCart from './ShoppingCartView';
import { ItemData } from '../interfaces';
import MenuDrawerView from './MenuDrawerView';

function TopbarView(props: {
  isPortrait: boolean;
  pages: string[];
  shoppingCart: ItemData[] | undefined;
  onCartRemoveItem: (index: number) => void;
  onCartCheckout: () => void;
  settings: string[];
  loggedIn: boolean;
  loginUrl: string;
  onLoginLogout: () => void;
}) {

  const handleLoginLogout = () => {
    props.onLoginLogout();
  };

  const isPortrait = props.isPortrait;
  const flexIfNotPortrait = isPortrait ? 'none' : 'flex';

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MenuDrawerView visible={isPortrait} drawerOpen={false} pages={props.pages} />
          <Link to="/">
            <div style={{
              display: 'flex',
              flexDirection: 'row',
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', bottom: '0' }}>
                <img src="/logo.svg" alt="logo" style={{ height: '50px', width: 'auto' }}/>
              </Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  display: flexIfNotPortrait,
                  mr: 2,
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
            </div>
          </Link>
          <Box sx={{ flexGrow: 1, display: flexIfNotPortrait }}>
            {props.pages.map((page) => (
              <Link
                key={page}
                to={'/' + page.toLowerCase()} // Update to attribute to 'to' for React Router
              >
                <Button sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>{page}</Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row' }}>
            {
              props.loggedIn ? (
                <ShoppingCart 
                  items={props.shoppingCart || []}
                  onRemoveItem={props.onCartRemoveItem}
                  onCheckout={props.onCartCheckout}
                />
              ) : <></>
            }
            <Button key="login" onClick={handleLoginLogout} sx={{ my: 2, color: 'white', display: 'block' }}>
              {props.loggedIn ? 'Logout' : 'Login'}
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopbarView;
