import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Form, Link } from 'react-router-dom';
import { TextField } from '@mui/material';

function TopbarView(props: { pages: string[]; settings: string[]; loggedIn: boolean; loginUrl: string; handleLoginLogout: Function; onSearchChange: Function; onSearch: Function }) {
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
                component="a"
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
                color: "black",
                background: "white"
              }
            }}
            onChange={(e) => {props.onSearchChange(e.target.value)}}
            onKeyUp={(e) => {if (e.key === "Enter") {props.onSearch();}}}
          />
          </Box>

          <Button
            key="login"
            onClick={handleLoginLogout}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            {props.loggedIn ? 'Logout' : 'Login'}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopbarView;
