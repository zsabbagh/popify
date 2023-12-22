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
  Popper,
  Grow,
  ClickAwayListener,
  Paper,
  MenuList,
} from '@mui/material';
import { Form, Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import ShoppingCart from './ShoppingCartView';
import { ItemData, User } from '../interfaces';
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
  user?: User;
}) {

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const images = props.user?.images;
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
        // Check if anchorRef.current is not null before calling focus()
        if (anchorRef.current) {
            anchorRef.current.focus();
        }
    }

    prevOpen.current = open;
}, [open]);


  const handleLoginLogout = () => {
    setOpen(false);
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
          {props.loggedIn ? (
            (console.log('shopping cart in topbarView', props.shoppingCart),
            (
              <ShoppingCart
                items={props.shoppingCart || []}
                onRemoveItem={props.onCartRemoveItem}
                onCheckout={props.onCartCheckout}
              />
            ))
          ) : (
            <></>
          )}
          {props.user ? (
            <>
              <Button
              style={{marginLeft: "10px"}}
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <Avatar style={{height: "50px", width: "50px"}} src={images![images!.length - 1].url}></Avatar>
              </Button>
            </>
          ) : (
            <Button key="login" onClick={handleLoginLogout} sx={{ my: 2, color: 'white', display: 'block' }}>
              Login
            </Button>
          )}
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button">
                      <Link style={{color: "black"}} to={`/user/${props.user?.id}`}><MenuItem>Profile</MenuItem></Link>
                      <MenuItem onClick={handleLoginLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopbarView;
